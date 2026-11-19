/**
 * ===================================================================
 * TELEGRAM БОТ СОГЛАСОВАНИЯ БРОНЕЙ ДЛЯ ДРЦ «МАКСИК» (Node.js)
 * ===================================================================
 * 
 * Бот: @maksikauth_bot
 * Токен: 9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4
 * 
 * КАК ЗАПУСТИТЬ:
 * 1. Откройте терминал в папке C:\Users\Admin\Desktop\Сайт_ДРЦ_Максик\telegram_bot
 * 2. Запустите:
 *    node bot.js
 * 3. Откройте @maksikauth_bot в Telegram и отправьте /start
 * ===================================================================
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ===================================================================
// НАСТРОЙКИ & ОБЛАЧНЫЙ СЕРВЕР (Render / Railway / Koyeb healthcheck):
// ===================================================================
const PORT = process.env.PORT || 8080;
try {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('🤖 Telegram Bot ДРЦ «Максик» (@maksikauth_bot) is active and running!\n');
  }).listen(PORT, () => {
    console.log(`[+] Health-check HTTP сервер активен на порту ${PORT} (совместим с Render, Railway, Koyeb)`);
  });
} catch (e) {
  console.log('[!] HTTP сервер не запущен:', e.message);
}
const BOT_TOKEN = "9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4";
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1BnSLRwPfXxePT0wwIoBW7scslc70BOEHynoIXgjXIkA/edit?usp=sharing";
const ADMINS_FILE = path.join(__dirname, 'admins.json');

// Загрузка сохраненных администраторов
function getAdmins() {
  try {
    if (fs.existsSync(ADMINS_FILE)) {
      return JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf8'));
    }
  } catch (e) {}
  return [];
}

function saveAdmin(chatId, username, firstName) {
  const admins = getAdmins();
  const exists = admins.find(a => a.chatId === chatId);
  if (!exists) {
    admins.push({ chatId, username: username || '', firstName: firstName || '', date: new Date().toISOString() });
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2), 'utf8');
    console.log(`[+] Новый администратор зарегистрирован: ${firstName} (@${username}), ID: ${chatId}`);
  }
}

let lastUpdateId = 0;

function callApi(method, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data || {});
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ ok: false, error: body });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Отправка заявки всем зарегистрированным администраторам
async function broadcastBooking(booking) {
  const admins = getAdmins();
  if (admins.length === 0) {
    console.warn("Предупреждение: еще ни один администратор не нажал /start в @maksikauth_bot!");
    return;
  }

  const cleanPhone = String(booking.phone || '').replace(/[^0-9]/g, '');
  const text = 
    `🎉 *НОВАЯ ЗАЯВКА НА ПРАЗДНИК В ДРЦ «МАКСИК»*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🆔 *Номер заявки:* #${booking.id || 'MAX-01'}\n` +
    `📅 *Дата:* ${booking.date || 'Не указана'}\n` +
    `⏰ *Время:* ${booking.time || '15:00 - 18:00'}\n` +
    `🎁 *Тариф:* ${booking.packageName || 'Праздник под ключ'}\n` +
    `👶 *Количество детей:* ${booking.kidsCount || 8} чел.\n` +
    (booking.addons && booking.addons.length ? `🎪 *Дополнительно:* ${booking.addons.join(', ')}\n` : '') +
    `💰 *Сумма:* ${booking.totalPrice ? Number(booking.totalPrice).toLocaleString('ru-RU') : '0'} ₽\n\n` +
    `👤 *Заказчик:* ${booking.parentName || 'Гость'}\n` +
    `📞 *Телефон:* ${booking.phone || 'Не указан'}\n` +
    (booking.notes ? `📝 *Пожелания:* ${booking.notes}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Подтвердите бронь, чтобы зафиксировать дату в графике:`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✅ Подтвердить бронь", callback_data: `CONFIRM:${booking.id || '01'}` },
        { text: "❌ Отклонить", callback_data: `REJECT:${booking.id || '01'}` }
      ],
      [
        { text: "📞 Позвонить клиенту", url: `tel:${booking.phone ? booking.phone.replace(/[^0-9+]/g, '') : ''}` },
        { text: "💬 WhatsApp", url: `https://wa.me/${cleanPhone}` }
      ],
      [
        { text: "📊 Открыть Google Таблицу", url: GOOGLE_SHEET_URL }
      ]
    ]
  };

  for (const admin of admins) {
    try {
      await callApi('sendMessage', {
        chat_id: admin.chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
      console.log(`[✓] Заявка #${booking.id} доставлена администратору ${admin.firstName} (${admin.chatId})`);
    } catch (e) {
      console.error(`[!] Ошибка отправки администратору ${admin.chatId}:`, e.message);
    }
  }
}


// URL Веб-приложения Google Apps Script (после развертывания в таблице)
let GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwkCEa9eMQzXMMfR7TXkM8W0gya57IwWS3t26KG-wUVmmSYF2d4j3bv6C6LEvmSfHV1xQ/exec";
const GAS_CONFIG_FILE = path.join(__dirname, 'gas_url.json');
try {
  if (fs.existsSync(GAS_CONFIG_FILE)) {
    GAS_WEBHOOK_URL = JSON.parse(fs.readFileSync(GAS_CONFIG_FILE, 'utf8')).url || "";
  }
} catch(e) {}

function cleanField(val) {
  if (!val) return '';
  return val.replace(/^[\s*:]+/, '').replace(/[\s*:]+$/, '').trim();
}

function parseBookingFromText(text, bookingId) {
  const getField = (pattern) => {
    const m = text.match(pattern);
    return m ? cleanField(m[1]) : '';
  };

  let rawDate = getField(/📅\s*\*?Дата\*?:?\s*([^\n\r]+)/i);
  const dateIsoMatch = rawDate.match(/(\d{4}-\d{2}-\d{2})/);
  const dateRuMatch = rawDate.match(/(\d{1,2}\.\d{1,2}\.\d{4})/);
  let finalDate = rawDate;
  if (dateIsoMatch) {
    finalDate = dateIsoMatch[1];
  } else if (dateRuMatch) {
    finalDate = dateRuMatch[1];
  } else {
    finalDate = rawDate.replace(/\s*\([^)]*\)/g, '').trim();
  }

  const rawKids = getField(/👶\s*\*?(?:Детей|Количество детей)\*?:?\s*([^\n\r]+)/i);
  const rawSum = getField(/💰\s*\*?Сумма\*?:?\s*([^\n\r]+)/i);

  const data = {
    action: "confirm_booking",
    bookingId: bookingId || "",
    date: cleanField(finalDate),
    time: getField(/⏰\s*\*?Время(?: начала)?\*?:?\s*([^\n\r]+)/i),
    package: getField(/🎁\s*\*?Тариф\*?:?\s*([^\n\r]+)/i),
    kids: rawKids.replace(/[^0-9]/g, '') || "8",
    total: rawSum.replace(/[^0-9]/g, '') || "",
    name: getField(/👤\s*\*?(?:Заказчик|Клиент|Имя)\*?:?\s*([^\n\r]+)/i) || "Клиент",
    phone: getField(/📞\s*\*?Телефон\*?:?\s*([^\n\r]+)/i),
    notes: getField(/📝\s*\*?(?:Пожелания|Комментарий)\*?:?\s*([^\n\r]+)/i),
    status: "Занято",
    createdAt: new Date().toISOString()
  };

  console.log('[+] Распознанная заявка из Telegram:', JSON.stringify(data, null, 2));
  return data;
}

async function sendToGoogleAppsScript(data, targetUrl = GAS_WEBHOOK_URL) {
  if (!targetUrl) return null;
  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      redirect: 'follow'
    });
    const text = await res.text();
    console.log('[+] Успешно записано в Google Таблицу через GAS:', text);
    return text;
  } catch (err) {
    console.warn('GAS fetch error:', err.message);
    return null;
  }
}

async function handleUpdate(u) {
  // 1. Команды в чате
  if (u.message && u.message.text) {
    const chatId = u.message.chat.id;
    const text = u.message.text.trim();
    const name = u.message.from.first_name || 'Создатель';
    const username = u.message.from.username || '';

    saveAdmin(chatId, username, name);

    if (text === '/start' || text === '/help') {
      const msg = 
        `👋 *Здравствуйте, ${name}!*\\n\\n` +
        `Вы успешно подключены как администратор детского центра *«МАКСИК»* (г. Шахты, ТРЦ «Максимум»).\\n\\n` +
        `🔑 *Ваш Chat ID:* \`${chatId}\`\\n\\n` +
        `📋 *Как работает приём заявок:*\\n` +
        `1. Клиент оформляет праздник на сайте https://maksik-shakhty.surge.sh\\n` +
        `2. Сюда мгновенно приходит карточка праздника с кнопками *«✅ Подтвердить бронь»* и *«❌ Отклонить»*\\n` +
        `3. При нажатии «Подтвердить» бронь отмечается как согласованная и вносится в Google Таблицу со статусом «Занято», а время на сайте блокируется!`;

      await callApi('sendMessage', {
        chat_id: chatId,
        text: msg,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "📊 Открыть Google Таблицу", url: GOOGLE_SHEET_URL }]
          ]
        }
      });
    } else if (text === '/id') {
      await callApi('sendMessage', {
        chat_id: chatId,
        text: `🔑 Ваш Chat ID: \`${chatId}\``,
        parse_mode: 'Markdown'
      });
    } else if (text === '/table') {
      await callApi('sendMessage', {
        chat_id: chatId,
        text: `📊 Ссылка на Google Таблицу занятости:\\n${GOOGLE_SHEET_URL}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: "📊 Открыть таблицу", url: GOOGLE_SHEET_URL }]
          ]
        }
      });
    }
  }

  // 2. Нажатия на кнопки в Telegram (Подтвердить / Отклонить)
  if (u.callback_query) {
    const cb = u.callback_query;
    const chatId = cb.message.chat.id;
    const messageId = cb.message.message_id;
    const data = cb.data;
    const adminName = cb.from.first_name || 'Администратор';

    if (data.startsWith('CONFIRM:')) {
      const bookingId = data.replace('CONFIRM:', '');
      const originalText = cb.message.text || '';
      const bookingData = parseBookingFromText(originalText, bookingId);
      await sendToGoogleAppsScript(bookingData);
      
      const updatedText = 
        originalText + 
        `\n\n━━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ *БРОНЬ #${bookingId} ПОДТВЕРЖДЕНА!* (согласовал: ${adminName})\n` +
        `📅 Дата зафиксирована со статусом «Занято». Время на сайте заблокировано.`;

      await callApi('editMessageText', {
        chat_id: chatId,
        message_id: messageId,
        text: updatedText,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "📊 Открыть Google Таблицу", url: GOOGLE_SHEET_URL }]
          ]
        }
      });

      await callApi('answerCallbackQuery', {
        callback_query_id: cb.id,
        text: `✅ Бронь #${bookingId} успешно подтверждена!`,
        show_alert: true
      });
    } else if (data.startsWith('REJECT:')) {
      const bookingId = data.replace('REJECT:', '');
      const originalText = cb.message.text || '';

      const updatedText = 
        originalText + 
        `\n\n━━━━━━━━━━━━━━━━━━━━━━\n` +
        `❌ *ЗАЯВКА #${bookingId} ОТКЛОНЕНА* (отклонил: ${adminName}).\n` +
        `В таблицу не внесена. Дата на сайте осталась свободной.`;

      await callApi('editMessageText', {
        chat_id: chatId,
        message_id: messageId,
        text: updatedText,
        parse_mode: 'Markdown'
      });

      await callApi('answerCallbackQuery', {
        callback_query_id: cb.id,
        text: `❌ Заявка #${bookingId} отклонена`,
        show_alert: false
      });
    }
  }
}

async function poll() {
  try {
    const res = await callApi('getUpdates', { offset: lastUpdateId + 1, timeout: 30 });
    if (res.ok && res.result && res.result.length > 0) {
      for (const u of res.result) {
        lastUpdateId = u.update_id;
        await handleUpdate(u);
      }
    }
  } catch (err) {
    console.error('Polling error:', err.message);
  }
  setTimeout(poll, 1000);
}

console.log('=====================================================');
console.log('🤖 Telegram бот ДРЦ «Максик» (@maksikauth_bot) запущен!');
console.log('Токен: 9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4');
console.log('Ожидание сообщений и заявок...');
console.log('Отправьте /start в бота @maksikauth_bot для подключения!');
console.log('=====================================================');

poll();
