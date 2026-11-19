Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\Admin\Desktop\Сайт_ДРЦ_Максик"
WshShell.Run "node ""C:\Users\Admin\Desktop\Сайт_ДРЦ_Максик\telegram_bot\bot.js""", 0, False
