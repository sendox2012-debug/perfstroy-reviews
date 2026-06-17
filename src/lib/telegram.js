export function initTelegram() {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    console.warn("Telegram WebApp не загружен");
    return null;
  }

  tg.ready();
  tg.expand();

  // Тёмная тема
  document.documentElement.style.colorScheme = "dark";

  return tg;
}

export function sendReviewToBot(tg, data) {
  if (!tg) return false;

  // Отправляем данные в бота (без ограничений по длине!)
  const jsonData = JSON.stringify(data);
  tg.sendData(jsonData);

  return true;
}
