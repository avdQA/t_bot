import { Markup } from 'telegraf';

const mainKeyboard = [
  [
    {
      text: '📝 Правила игри',
      callback_data: 'mainRule',
    },
  ],
  [
    {
      text: 'Раздел с ситуациями',
      callback_data: 'category',
    },
  ],
];

export function getMainMenu() {
  return Markup.inlineKeyboard(mainKeyboard);
}

export function yesNoKeyboard() {
  return Markup.inlineKeyboard([
    { text: 'Нет', callback_data: 'no' },
    { text: 'Да', callback_data: 'adult' },
  ]);
}
