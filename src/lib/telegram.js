export function createReviewLink(data) {
  const { contactType, contact, rating, review } = data;

  // Ограничиваем длину
  const cleanContact = contact.trim().substring(0, 20);
  const cleanReview = review.trim().substring(0, 80);

  // Формат: type|contact|rating|review
  const dataString = `${contactType}|${cleanContact}|${rating}|${cleanReview}`;
  const encoded = encodeURIComponent(dataString);

  return `https://t.me/Perfstroybot?start=rev_${encoded}`;
}
