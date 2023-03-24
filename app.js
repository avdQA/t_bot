import express from 'express';
import _ from 'lodash';
import botConfig from './app.config.js';

import { Telegraf } from 'telegraf';
import { getMainMenu, yesNoKeyboard } from './keyboards.js';

const app = express();
app.set('trust proxy', true);

const bot = new Telegraf(botConfig.TELEGRAM_BOT_TOKEN);

function botStart(ctx) {
  return ctx.reply(botConfig.BOT_TEXT_GREETING, getMainMenu());
}

function checkAdult(ctx) {
  ctx.reply('Вам уже исполнилось 18 лет?', yesNoKeyboard());
}

function getContent(ctx) {
  let num = _.random(1, 5);
  const {
    update: {
      callback_query: { data },
    },
  } = ctx;
  let catPic;
  if (data === 'kavai') catPic = '⭐';
  if (data === 'family') catPic = '🎮';
  if (data === 'challenge') catPic = '🔥';
  if (data === 'teen') catPic = '🤙';
  if (data === 'adult') catPic = '🤬';

  return ctx.replyWithPhoto(
    botConfig.GC_BUCKET_PUBLIC + `/images/cat/${data}/${num}.jpg`,
    {
      caption: 'Чтобы получить новую ситуацию, нажми на кнопку «ПОЛУЧИТЬ»',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `${catPic} Получить`,
              callback_data: data,
            },
          ],
          [
            {
              text: 'Переключить раздел',
              callback_data: 'category',
            },
          ],
        ],
      },
    }
  );
}

function getCategory(ctx) {
  return ctx.reply(botConfig.BOT_TEXT_CATEGORY, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Детский кавай',
            callback_data: 'kavai',
          },
        ],
        [
          {
            text: 'Семейный движ',
            callback_data: 'family',
          },
        ],
        [
          {
            text: 'Жизненный челенж',
            callback_data: 'challenge',
          },
        ],
        [
          {
            text: 'Подростковый рофл',
            callback_data: 'teen',
          },
        ],
        [
          {
            text: 'Зашквар 18+',
            callback_data: 'checkAdult',
          },
        ],
        [
          {
            text: '📝 Правила игри',
            callback_data: 'mainRule',
          },
        ],
      ],
    },
  });
}

function getMainRule(ctx) {
  return ctx.replyWithPhoto(botConfig.GC_BUCKET_PUBLIC + `/images/rule.jpg`, {
    caption: botConfig.BOT_TEXT_RULE,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '⏪ Вернуться назад',
            callback_data: 'mainMenu',
          },
        ],
      ],
    },
  });
}

bot.start((ctx) => {
  botStart(ctx);
});

bot.on('callback_query', (ctx) => {
  const data = ctx.update.callback_query.data;
  if (data === 'mainRule') {
    getMainRule(ctx);
  }

  if (data === 'mainMenu') {
    botStart(ctx);
  }

  if (data === 'category') {
    getCategory(ctx);
  }

  if (data === 'checkAdult') {
    checkAdult(ctx);
  }

  if (data === 'no') {
    ctx
      .reply(
        'Выберите другие ситуации, пожалуйста.\nСейчас бот отправит вас в меню'
      )
      .then(() => {
        _.delay(function () {
          getCategory(ctx);
        }, 3000);
      });
  }

  if (
    data === 'kavai' ||
    data === 'family' ||
    data === 'challenge' ||
    data === 'teen' ||
    data === 'adult'
  ) {
    getContent(ctx);
  }
});

bot.command('time', (ctx) => {
  ctx.reply(String(new Date()));
});

bot.on('sticker', (ctx) => {
  ctx.reply('Прикольный стикер');
});

bot.launch();

app.listen(botConfig.PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening on PORT ', botConfig.PORT);
});

// With middleware
app.use('/', function (req, res, next) {
  res.send({
    title:
      'Hi there, "♠ ♥ ♦ ♣ Та самая игра в мемы" is sucssesfuly running ...',
  });
  next();
});

app.get('/', function (req, res) {
  console.log(
    'Hi there, "♠ ♥ ♦ ♣ Та самая игра в мемы" is sucssesfuly running ...'
  );
});
