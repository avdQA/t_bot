import express from 'express';
import _ from 'lodash';
import { Telegraf } from 'telegraf';
import { getMainMenu } from './keyboards.js';

const PORT = process.env.PORT || 3000;
const TOKEN =
  process.env.TBOT_TOKEN || '5924752974:AAGEM6-fehG0I5KWmcz_noW0tANR1szabUI';
const app = express();
const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
  ctx.replyWithHTML(
    'Приветсвую в игре <b>Та самая игра в мемы</b>\n\n' +
      'Чтобы быстро добавить задачу, просто напишите ее и отправьте боту',
    getMainMenu()
  );
  // ctx.reply('Welcome, bro', getMainMenu())
});

bot.hears('Узкій Воєнний корабель іди ...', (ctx) => {
  let num = _.random(1, 256);
  ctx.replyWithPhoto(`https://picsum.photos/id/${num}/500/300`, {
    caption: 'nice place!',
  });
});

bot.command('time', (ctx) => {
  ctx.reply(String(new Date()));
});

bot.on('text', (ctx) => {
  ctx.reply('just text');
});

bot.on('sticker', (ctx) => {
  ctx.reply('Прикольный стикер');
});

bot.on('edited_message', (ctx) => {
  ctx.reply('Вы успешно изменили сообщение');
});

bot.launch();

// With middleware
app.use('/', function (req, res, next) {
  res.send({ title: 'Hi there, "FlashMyBot" is sucssesfuly running ...' });
  next();
});

app.get('/', function (req, res) {
  console.log('Body Sent');
});

app.get('/info', (req, res) => {
  res.send(`This server has PORT: ${PORT}`);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening on PORT ', PORT);
});
