const TelegramBot = require('node-telegram-bot-api');

// ⚙️ НАСТРОЙКИ (из Secrets в Replit)
const TOKEN = process.env.BOT_TOKEN;
const DISCORD_LINK = process.env.DISCORD_LINK || 'https://discord.gg/XMrNfZpS';

const bot = new TelegramBot(TOKEN, { polling: true });

// 🎨 МЕГА приветственное сообщение
const getWelcomeMessage = (name) => `
<b>┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓</b>
<b>┃</b>  ⚡ <b>PROPANCEO LUA</b> ⚡        <b>┃</b>
<b>┃</b>     𝙋𝙍𝙀𝙈𝙄𝙐𝙈 𝘾𝙊𝙈𝙈𝙐𝙉𝙄𝙏𝙔        <b>┃</b>
<b>┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛</b>

🎯 <b>Йоу, ${name}!</b>

Рад тебя видеть в нашем боте! 
Ты попал в топовое комьюнити 
Lua PropnCeo Lua (ft Gamesense) 💎

<b>▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</b>

<b>🔥 ЧТО ТЕБЯ ЖДЁТ:</b>

  ╭─────────────────────╮
  │ 💻 Lua скрипты       │
  │ 📚 Гайды и туторы    │
  │ 🎁 Халява и раздачи  │
  │ 👥 Топ комьюнити     │
  │ 🛠 Помощь 24/7       │
  ╰─────────────────────╯

<b>▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</b>

⬇️ <b>Выбирай действие:</b>
`;

// 🎯 Главная клавиатура
const getMainKeyboard = () => ({
    reply_markup: {
        inline_keyboard: [
            [{ text: '🚀 ВОЙТИ В DISCORD', url: DISCORD_LINK }],
            [
                { text: '📜 О нас', callback_data: 'about' },
                { text: '🎁 Бонусы', callback_data: 'bonus' }
            ],
            [
                { text: '📊 Статистика', callback_data: 'stats' },
                { text: '❓ FAQ', callback_data: 'faq' }
            ],
            [{ text: '💬 Связь с админом', callback_data: 'contact' }]
        ]
    },
    parse_mode: 'HTML'
});

// /start команда
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'Друг';
    bot.sendMessage(chatId, getWelcomeMessage(name), getMainKeyboard());
});

// Обработка кнопок
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    
    const responses = {
        about: `
<b>┏━━━━━ 📜 О НАС ━━━━━┓</b>

⚡ <b>PROPANCEO LUA</b> — это топовое 
комьюнити для Lua разработчиков!

<b>🏆 Наши достижения:</b>
├ 📅 Работаем с 2024 года
├ 👥 Сотни активных участников
├ 💻 Тысячи строк кода
└ 🔥 Лучшие скрипты рунета

<b>🎯 Наша миссия:</b>
<i>РАЗХУЯРИТЬ ХВХ С НАШЕЙ ЛУА</i>

<b>┗━━━━━━━━━━━━━━━━━━━┛</b>
        `,
        bonus: `
<b>┏━━━━━ 🎁 БОНУСЫ ━━━━━┓</b>

Присоединяйся к Discord и получи:

� <b>Для нIовичков:</b>
├ 📦 Стартер-пак скриптов
├ 📚 Доступ к базе знаний
└ 🎫 Роль участника

� <b>Для пактивных:</b>
├ ⭐ Эксклюзивные скрипты
├ 🏷 Особые роли
└ 🎯 Ранний доступ к новинкам

<b>┗━━━━━━━━━━━━━━━━━━━┛</b>
        `,
        stats: `
<b>┏━━━━ 📊 СТАТИСТИКА ━━━━┓</b>

📈 <b>Наши цифры:</b>

  🟢 Бот онлайн: <code>24/7</code>
  👥 Участников: <code>растём!</code>
  💻 Скриптов: <code>1</code>
  ⭐ Рейтинг: <code>★★★★★</code>

<i>Присоединяйся и стань частью 
нашего комьюнити!</i>

<b>┗━━━━━━━━━━━━━━━━━━━┛</b>
        `,
        faq: `
<b>┏━━━━━━ ❓ FAQ ━━━━━━┓</b>

<b>Q: Как вступить в Discord?</b>
A: Жми кнопку "Войти в Discord"!

<b>Q: Это бесплатно?</b>
A: Да, полностью бесплатно! 🆓

<b>Q: Что такое Propanceo Lua?</b>
A: Gamesense Lua AAA
   с кучей полезного контента!

<b>Q: Как получить помощь?</b>
A: Пиши в Discord, поможем! 💬

<b>┗━━━━━━━━━━━━━━━━━━━┛</b>
        `,
        contact: `
<b>┏━━━━ 💬 КОНТАКТЫ ━━━━┓</b>

📩 <b>Связаться с нами:</b>

Лучший способ — написать 
в Discord сервере!

🎮 Там админы и модеры 
   ответят на все вопросы.

<i>Обычно отвечаем в течение 
нескольких часов!</i>

<b>┗━━━━━━━━━━━━━━━━━━━┛</b>
        `,
        back: null
    };

    if (query.data === 'back') {
        const name = query.from.first_name || 'Друг';
        await bot.editMessageText(getWelcomeMessage(name), {
            chat_id: chatId,
            message_id: messageId,
            ...getMainKeyboard()
        });
    } else if (responses[query.data]) {
        const backKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🚀 ВОЙТИ В DISCORD', url: DISCORD_LINK }],
                    [{ text: '◀️ Назад в меню', callback_data: 'back' }]
                ]
            },
            parse_mode: 'HTML'
        };
        await bot.editMessageText(responses[query.data], {
            chat_id: chatId,
            message_id: messageId,
            ...backKeyboard
        });
    }
    
    bot.answerCallbackQuery(query.id);
});

// /discord команда
bot.onText(/\/discord/, (msg) => {
    const chatId = msg.chat.id;
    const text = `
<b>┏━━━ 🎮 DISCORD ━━━┓</b>

⚡ <b>PROPANCEO LUA SERVER</b>

Жми кнопку и залетай к нам!
Ждём тебя в комьюнити 🔥

<b>┗━━━━━━━━━━━━━━━━━━┛</b>
    `;
    bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[{ text: '🚀 ПЕРЕЙТИ В DISCORD', url: DISCORD_LINK }]]
        }
    });
});

// /info команда  
bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    
    const text = `
<b>┏━━━━ ⚡ INFO ━━━━┓</b>

🤖 <b>PROPANCEO LUA BOT</b>

├ 📌 Версия: <code>2.0.0</code>
├ 🟢 Статус: <code>Online</code>
├ ⏱ Аптайм: <code>${hours}ч ${mins}м</code>
└ 💻 Node.js: <code>${process.version}</code>

<i>Создан с ❤️ для комьюнити</i>

<b>┗━━━━━━━━━━━━━━━━━┛</b>
    `;
    bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
});

// Ответ на любое сообщение
bot.on('message', (msg) => {
    if (msg.text && !msg.text.startsWith('/')) {
        const chatId = msg.chat.id;
        const text = `
🤔 <b>Не понял тебя!</b>

Напиши /start чтобы открыть меню
Или жми кнопку ниже 👇
        `;
        bot.sendMessage(chatId, text, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[{ text: '📋 Открыть меню', callback_data: 'back' }]]
            }
        });
    }
});

console.log('🚀 Бот v2.0 запущен!');
