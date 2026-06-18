export function stringToHex(str) {
  const utf8 = unescape(encodeURIComponent(str));
  let hex = "";
  for (let i = 0; i < utf8.length; i++) {
    hex += utf8.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}

// Короткая ссылка: только тип|контакт|рейтинг
export function createReviewLink(data) {
  const { contactType, contact, rating } = data;

  const cleanContact = contact.trim().substring(0, 20);
  const dataString = `${contactType}|${cleanContact}|${rating}`;

  const hex = stringToHex(dataString);
  return `https://t.me/Perfstroybot?start=rev_${hex}`;
}
