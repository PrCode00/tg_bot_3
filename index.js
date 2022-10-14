const {gameOptions, againOptions} = require('./options')
const TelegramApi = require('node-telegram-bot-api')

const token ='1979638926:AAH_SZwBaRBpAohwce1iS-5D1x7vnyD_QlM'


const bot = new TelegramApi(token, {polling: true})
const chats = {}



const startGame =async (chatId) => {
    await  bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, попробуй отгадать)')
    const randomNum = Math.floor(Math.random() * 10)
    chats[chatId] = randomNum
    await bot.sendMessage(chatId, 'отгадывай)', gameOptions)
}

const start = () => {
    bot.setMyCommands( [
        {command: '/start', description : 'Начальное Приветствие'},
        {command: '/info', description : 'Информация о пользователе'},
        {command: '/help', description : 'Если что-то непонятно'},
        {command: '/game', description : 'поиграем?)'},

    ])
    bot.on('message', async msg => {
        const text = msg.text
        const chatId= msg.chat.id

        if (text === '/start') {
            await  bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/6f9/bf3/6f9bf3ed-544f-37cf-b3e1-1779eccbf3d2/192/17.webp')
            return   bot.sendMessage(chatId, 'Добро Пожаловать Путник!')
        }
        if (text === '/info') {
            if (msg.from.last_name == undefined) {
                return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name}`)
            } else {
                return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
            }
        }
        if (text === '/help') {
            return  bot.sendMessage(chatId, 'Чем могу помочь?')
        }
        if (text === '/game') {
          return  startGame(chatId)
        }
            return bot.sendMessage(chatId, 'Моя твоя не понимать')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data ==='/again') {
                return startGame(chatId)
        }
        if (data === chats[chatId]) {
            await  bot.sendMessage(chatId, `Молодец, ты отгадал, моя цифрa : ${chats[chatId]}`, againOptions)
        } else {
            await  bot.sendMessage(chatId, `ЛОЛ, моя цифра ${chats[chatId]})))`, againOptions)
        }
    })
}


start()