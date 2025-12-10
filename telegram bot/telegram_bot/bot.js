const TelegramBot = require('node-telegram-bot-api');

// ⚙️ НАСТРОЙКИ
const TOKEN = '8287902684:AAEt29Zz1bYQsj5OQ9YOvrIJlS7V56tHNoA';
const DISCORD_LINK = 'https://discord.gg/XMrNfZpS';

const bot = new TelegramBot(TOKEN, { polling: true });

// 🎨 Красивое приветственное сообщение
const getWelcomeMessage = (name) => `
╔══════════════════════════════╗
║  🎮 PROPANCEO LUA COMMUNITY  ║
╚══════════════════════════════╝

Йо, ${name}! 👋

Добро пожаловать в наше комьюнити!
Здесь мы занимаемся Lua скриптингом 
и делимся крутыми наработками 🔥

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Что тебя ждёт на сервере:
├ 💻 Lua скрипты и гайды
├ 🤝 Помощь от комьюнити  
├ 🎁 Эксклюзивный контент
└ 💬 Общение с единомышленниками

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Жми кнопку ниже и погнали! 👇
`;

// 🎯 Клавиатура с кнопками
const mainKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🎮 Войти в Discord', url: DISCORD_LINK }],
            [{ text: '📜 О нас', callback_data: 'about' }, { text: '❓ Помощь', callback_data: 'help' }]
        ]
    },
    parse_mode: 'HTML'
};

// /start команда
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'Друг';
    
    bot.sendMessage(chatId, getWelcomeMessage(name), mainKeyboard);
});

// Обработка кнопок
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    
    if (query.data === 'about') {
        const aboutText = `
🔥 <b>PROPANCEO LUA</b>

Мы — комьюнити разработчиков и 
энтузиастов Lua скриптинга.

📅 Основано: 2024
👥 Участников: растём каждый день!
🎯 Цель: делиться знаниями и кайфовать

<i>Присоединяйся к нам!</i> 🚀
        `;
        bot.sendMessage(chatId, aboutText, { parse_mode: 'HTML', ...mainKeyboard });
    }
    
    if (query.data === 'help') {
        const helpText = `
❓ <b>ПОМОЩЬ</b>

Доступные команды:
├ /start — главное меню
├ /discord — получить ссылку
└ /info — информация о боте

Есть вопросы? Пиши в Discord! 💬
        `;
        bot.sendMessage(chatId, helpText, { parse_mode: 'HTML', ...mainKeyboard });
    }
    
    bot.answerCallbackQuery(query.id);
});

// /discord команда
bot.onText(/\/discord/, (msg) => {
    const chatId = msg.chat.id;
    const text = `
🎮 <b>НАШ DISCORD СЕРВЕР</b>

Переходи по ссылке и присоединяйся 
к Propanceo Lua комьюнити!

👇 Жми кнопку ниже
    `;
    bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[{ text: '🚀 Перейти в Discord', url: DISCORD_LINK }]]
        }
    });
});

// /info команда  
bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    const text = `
⚡ <b>PROPANCEO LUA BOT</b>

Версия: 1.0.0
Статус: Online 🟢
Создан с ❤️ для комьюнити
    `;
    bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
});

// Ответ на любое сообщение
bot.on('message', (msg) => {
    if (msg.text && !msg.text.startsWith('/')) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 
            '👋 Напиши /start чтобы открыть меню!\n\nИли сразу жми кнопку ниже 👇',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: '🎮 Discord сервер', url: DISCORD_LINK }]]
                }
            }
        );
    }
});

console.log('🚀 Бот запущен и готов к работе!');

