import { Markup } from 'telegraf';

export function getMainMenu() {
  return Markup.keyboard([
    ['Мої завдання', 'Наваляти Русні'],
    ['Узкій Воєнний корабель іди ...'],
  ]).resize();
}

export function yesNoKeyboard() {
  return Markup.inlineKeyboard(
    [Markup.callbackButton('Да', 'yes'), Markup.callbackButton('Нет', 'no')],
    { columns: 2 }
  );
}
