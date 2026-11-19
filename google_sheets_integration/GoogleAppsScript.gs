/**
 * ===================================================================
 * GOOGLE APPS SCRIPT ДЛЯ ДРЦ «МАКСИК» (г. Шахты)
 * Онлайн-бронирование + Google Таблица + Telegram Бот с кнопками
 * ===================================================================
 * 
 * Таблица: https://docs.google.com/spreadsheets/d/1BnSLRwPfXxePT0wwIoBW7scslc70BOEHynoIXgjXIkA
 * Бот: @maksikauth_bot
 * ===================================================================
 */

// ===================================================================
// НАСТРОЙКИ:
// ===================================================================
var TELEGRAM_BOT_TOKEN = "9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4";
var TELEGRAM_CHAT_ID = "6564678119";
var SHEET_NAME = "Бронирования";

/**
 * Получение или создание листа таблицы
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Дата", 
      "Время", 
      "Статус", 
      "Имя клиента", 
      "Телефон", 
      "Тариф", 
      "Детей", 
      "Сумма (₽)", 
      "Комментарий", 
      "Дата заявки"
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#FFF3EE");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * GET-запрос: Сайт опрашивает занятые даты и слоты из таблицы
 */
function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    var busySlots = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var rawDate = row[0];
      var rawTime = row[1];
      var time = "";
      if (rawTime instanceof Date) {
        var h = ("0" + rawTime.getHours()).slice(-2);
        var min = ("0" + rawTime.getMinutes()).slice(-2);
        time = h + ":" + min;
      } else {
        time = String(rawTime || "Весь день").trim();
      }
      var status = String(row[2] || "").trim().toLowerCase();

      if (!rawDate) continue;

      var dateStr = "";
      if (rawDate instanceof Date) {
        var y = rawDate.getFullYear();
        var m = ("0" + (rawDate.getMonth() + 1)).slice(-2);
        var d = ("0" + rawDate.getDate()).slice(-2);
        dateStr = y + "-" + m + "-" + d;
      } else {
        dateStr = String(rawDate).trim();
      }

      if (status.indexOf("занят") !== -1 || status === "busy" || status === "забронировано") {
        busySlots.push({
          date: dateStr,
          time: time,
          status: "Занято",
          client: row[3] || ""
        });
      }
    }

    var result = {
      success: true,
      count: busySlots.length,
      busySlots: busySlots,
      timestamp: new Date().toISOString()
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST-запрос: Обработка заявок с сайта И нажатий кнопок в Telegram боте!
 */
function doPost(e) {
  try {
    var payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    // СЛУЧАЙ 1: Прямая запись подтвержденной брони от bot.js
    if (payload.action === "confirm_booking" || payload.action === "write_row") {
      var sheet = getOrCreateSheet();
      var nowStr = Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm");
      sheet.appendRow([
        payload.date || "",
        payload.time || "",
        payload.status || "Занято",
        payload.name || payload.parentName || "",
        payload.phone || "",
        payload.package || payload.packageName || "",
        payload.kids || payload.kidsCount || "",
        payload.total || payload.totalPrice || "",
        payload.notes || payload.comment || "",
        nowStr
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: "Строка успешно добавлена в таблицу" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // СЛУЧАЙ 2: Нажатие кнопки администратором в Telegram (callback_query через Webhook)
    if (payload.callback_query) {
      return handleTelegramCallback(payload.callback_query);
    }

    // СЛУЧАЙ 3: Новая заявка с сайта
    return handleSiteBooking(payload);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Обработка заявки с сайта: отправка в Telegram создателям
 */
function handleSiteBooking(payload) {
  var bookDate = String(payload.date || payload.bookDate || "").trim();
  var bookTime = String(payload.time || payload.bookTime || "").trim();
  var clientName = payload.name || payload.parentName || "Гость";
  var clientPhone = payload.phone || payload.parentPhone || "";
  var packageName = payload.package || payload.packageName || "Стандарт";
  var kidsCount = payload.kids || payload.kidsCount || 8;
  var totalPrice = payload.total || payload.totalPrice || "";
  var notes = payload.notes || payload.comment || "";
  var addons = payload.addons || [];
  if (Array.isArray(addons)) addons = addons.join(", ");

  var bookingId = "MAX-" + Utilities.formatDate(new Date(), "GMT+3", "ddMM") + "-" + Math.floor(1000 + Math.random() * 9000);

  // Сохраняем заявку во временное хранилище свойств скрипта (на 7 дней)
  var bookingData = {
    id: bookingId,
    date: bookDate,
    time: bookTime,
    name: clientName,
    phone: clientPhone,
    package: packageName,
    kids: kidsCount,
    total: totalPrice,
    notes: notes,
    addons: addons,
    createdAt: new Date().toISOString()
  };

  PropertiesService.getScriptProperties().setProperty(bookingId, JSON.stringify(bookingData));

  // Отправляем уведомление в Telegram создателям с интерактивными кнопками
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "ВАШ_ТОКЕН_БОТА") {
    var text = "🎉 *НОВАЯ ЗАЯВКА НА ПРАЗДНИК В ДРЦ «МАКСИК»*\n" +
               "━━━━━━━━━━━━━━━━━━━━━━\n" +
               "🆔 *Заявка:* #" + bookingId + "\n" +
               "📅 *Дата:* " + bookDate + "\n" +
               "⏰ *Время:* " + bookTime + "\n" +
               "🎁 *Тариф:* " + packageName + "\n" +
               "👶 *Детей:* " + kidsCount + "\n" +
               (addons ? "🎪 *Дополнительно:* " + addons + "\n" : "") +
               "💰 *Сумма:* " + totalPrice + " ₽\n\n" +
               "👤 *Клиент:* " + clientName + "\n" +
               "📞 *Телефон:* " + clientPhone + "\n" +
               (notes ? "📝 *Комментарий:* " + notes + "\n" : "") +
               "━━━━━━━━━━━━━━━━━━━━━━\n" +
               "Подтвердите бронь, чтобы автоматически записать её в Google Таблицу:";

    var cleanPhone = clientPhone.replace(/[^0-9]/g, "");
    var keyboard = {
      inline_keyboard: [
        [
          { text: "✅ Подтвердить бронь", callback_data: "CONFIRM:" + bookingId },
          { text: "❌ Отклонить", callback_data: "REJECT:" + bookingId }
        ],
        [
          { text: "💬 Написать в WhatsApp", url: "https://wa.me/" + cleanPhone },
          { text: "📊 Google Таблица", url: "https://docs.google.com/spreadsheets/d/1BnSLRwPfXxePT0wwIoBW7scslc70BOEHynoIXgjXIkA/edit?usp=sharing" }
        ]
      ]
    };

    sendTelegramMessage(TELEGRAM_CHAT_ID, text, keyboard);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      bookingId: bookingId,
      message: "Заявка отправлена создателям ДРЦ «Максик» в Telegram на согласование!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Обработка нажатия кнопок в Telegram боте
 */
function handleTelegramCallback(callback) {
  var data = callback.data || "";
  var messageId = callback.message.message_id;
  var chatId = callback.message.chat.id;
  var originalText = callback.message.text || "";

  if (data.indexOf("CONFIRM:") === 0) {
    var bookingId = data.replace("CONFIRM:", "");
    var rawJson = PropertiesService.getScriptProperties().getProperty(bookingId);

    if (rawJson) {
      var b = JSON.parse(rawJson);
      var sheet = getOrCreateSheet();
      var nowStr = Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm");

      // Вносим запись в Google Таблицу
      sheet.appendRow([
        b.date,
        b.time,
        "Занято",
        b.name,
        b.phone,
        b.package,
        b.kids,
        b.total,
        b.notes,
        nowStr
      ]);

      // Обновляем текст в Telegram (кнопки убираем)
      var updatedText = originalText + "\n\n" +
        "✅ *БРОНЬ ПОДТВЕРЖДЕНА СОЗДАТЕЛЯМИ!*\n" +
        "Запись внесена в Google Таблицу со статусом «Занято».\n" +
        "Слот " + b.time + " на дату " + b.date + " заблокирован на сайте.";

      editTelegramMessage(chatId, messageId, updatedText);
      answerTelegramCallback(callback.id, "Бронь подтверждена и добавлена в таблицу!");

      // Удаляем из временного хранилища
      PropertiesService.getScriptProperties().deleteProperty(bookingId);
    } else {
      answerTelegramCallback(callback.id, "Заявка уже была обработана ранее.");
    }

  } else if (data.indexOf("REJECT:") === 0) {
    var bookingId = data.replace("REJECT:", "");
    PropertiesService.getScriptProperties().deleteProperty(bookingId);

    var updatedText = originalText + "\n\n" +
      "❌ *ЗАЯВКА ОТКЛОНЕНА.*\n" +
      "Запись в таблицу не вносилась. Время на сайте осталось свободным.";

    editTelegramMessage(chatId, messageId, updatedText);
    answerTelegramCallback(callback.id, "Заявка отклонена.");
  }

  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

// -------------------------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ TELEGRAM BOT API
// -------------------------------------------------------------------
function sendTelegramMessage(chatId, text, keyboard) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
  var payload = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
    reply_markup: keyboard
  };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function editMessageText(chatId, messageId, text) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/editMessageText";
  var payload = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: "Markdown"
  };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function answerCallbackQuery(callbackQueryId, text) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/answerCallbackQuery";
  var payload = {
    callback_query_id: callbackQueryId,
    text: text
  };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}
