import telebot
from telebot import types
import json
import os
import re
import urllib.request

BOT_TOKEN = "9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4"
GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1BnSLRwPfXxePT0wwIoBW7scslc70BOEHynoIXgjXIkA/edit?usp=sharing"
GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwkCEa9eMQzXMMfR7TXkM8W0gya57IwWS3t26KG-wUVmmSYF2d4j3bv6C6LEvmSfHV1xQ/exec"
ADMINS_FILE = os.path.join(os.path.dirname(__file__), "admins.json")

bot = telebot.TeleBot(BOT_TOKEN)

def get_admins():
    if os.path.exists(ADMINS_FILE):
        try:
            with open(ADMINS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_admin(chat_id, username, first_name):
    admins = get_admins()
    if not any(a.get("chatId") == chat_id for a in admins):
        admins.append({
            "chatId": chat_id,
            "username": username or "",
            "firstName": first_name or "",
        })
        with open(ADMINS_FILE, "w", encoding="utf-8") as f:
            json.dump(admins, f, ensure_ascii=False, indent=2)

def parse_booking(text, booking_id):
    def get_field(pattern):
        m = re.search(pattern, text, re.IGNORECASE)
        return m.group(1).strip() if m else ""

    raw_date = get_field(r"📅\s*\*?Дата\*?:?\s*([^\n\r]+)")
    date_iso = re.search(r"(\d{4}-\d{2}-\d{2})", raw_date)
    date_ru = re.search(r"(\d{1,2}\.\d{1,2}\.\d{4})", raw_date)
    final_date = date_iso.group(1) if date_iso else (date_ru.group(1) if date_ru else re.sub(r"\s*\([^)]*\)", "", raw_date).strip())

    raw_kids = get_field(r"👶\s*\*?(?:Детей|Количество детей)\*?:?\s*([^\n\r]+)")
    raw_sum = get_field(r"💰\s*\*?Сумма\*?:?\s*([^\n\r]+)")

    return {
        "action": "confirm_booking",
        "bookingId": booking_id,
        "date": final_date,
        "time": get_field(r"⏰\s*\*?Время(?: начала)?\*?:?\s*([^\n\r]+)"),
        "package": get_field(r"🎁\s*\*?Тариф\*?:?\s*([^\n\r]+)"),
        "kids": re.sub(r"[^0-9]", "", raw_kids) or "8",
        "total": re.sub(r"[^0-9]", "", raw_sum),
        "name": get_field(r"👤\s*\*?(?:Заказчик|Клиент|Имя)\*?:?\s*([^\n\r]+)") or "Клиент",
        "phone": get_field(r"📞\s*\*?Телефон\*?:?\s*([^\n\r]+)"),
        "notes": get_field(r"📝\s*\*?(?:Пожелания|Комментарий)\*?:?\s*([^\n\r]+)"),
        "status": "Занято"
    }

def send_to_google_apps_script(data):
    if not GAS_WEBHOOK_URL:
        return
    try:
        req = urllib.request.Request(
            GAS_WEBHOOK_URL,
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print("GAS error:", e)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    chat_id = message.chat.id
    name = message.from_user.first_name or "Создатель"
    save_admin(chat_id, message.from_user.username, name)
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("📊 Открыть Google Таблицу", url=GOOGLE_SHEET_URL))
    text = (
        f"👋 *Здравствуйте, {name}!*\\n\\n"
        f"Вы успешно подключены как администратор детского центра *«МАКСИК»* (г. Шахты, ТРЦ «Максимум»).\\n\\n"
        f"🔑 *Ваш Chat ID:* `{chat_id}`\\n\\n"
        f"📋 Сюда мгновенно приходят заявки на дни рождения с сайта с кнопками подтверждения!"
    )
    bot.reply_to(message, text, parse_mode="Markdown", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    chat_id = call.message.chat.id
    message_id = call.message.message_id
    admin_name = call.from_user.first_name or "Администратор"

    if call.data.startswith("CONFIRM:"):
        booking_id = call.data.replace("CONFIRM:", "")
        original_text = call.message.text or ""
        booking_data = parse_booking(original_text, booking_id)
        send_to_google_apps_script(booking_data)

        updated_text = (
            f"{original_text}\\n\\n"
            f"━━━━━━━━━━━━━━━━━━━━━━\\n"
            f"✅ *БРОНЬ #{booking_id} ПОДТВЕРЖДЕНА!* (согласовал: {admin_name})\\n"
            f"📅 Дата зафиксирована в Google Таблице со статусом «Занято»."
        )
        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("📊 Открыть Google Таблицу", url=GOOGLE_SHEET_URL))

        bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=updated_text, parse_mode="Markdown", reply_markup=markup)
        bot.answer_callback_query(call.id, text=f"✅ Бронь #{booking_id} записана в Google Таблицу!", show_alert=True)

    elif call.data.startswith("REJECT:"):
        booking_id = call.data.replace("REJECT:", "")
        original_text = call.message.text or ""
        updated_text = (
            f"{original_text}\\n\\n"
            f"━━━━━━━━━━━━━━━━━━━━━━\\n"
            f"❌ *ЗАЯВКА #{booking_id} ОТКЛОНЕНА* (отклонил: {admin_name}).\\n"
            f"В таблицу не внесена."
        )
        bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=updated_text, parse_mode="Markdown")
        bot.answer_callback_query(call.id, text=f"❌ Заявка #{booking_id} отклонена", show_alert=False)

if __name__ == "__main__":
    bot.infinity_polling()
