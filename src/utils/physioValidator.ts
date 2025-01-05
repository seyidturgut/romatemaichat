export function isPhysioRelatedQuery(message: string): boolean {
  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase().trim();

  // Check for farewell messages
  const farewellWords = [
    'teşekkür', 'teşekkürler', 'sağol', 'sağolun',
    'görüşürüz', 'hoşçakal', 'güle güle', 'bye', 'iyi günler',
    'rica', 'memnun'
  ];

  if (farewellWords.some(word => lowerMessage.includes(word))) {
    return true;
  }

  // Check for city names and locations
  const locationKeywords = [
    'istanbul', 'ankara', 'izmir', 'bursa', 'kocaeli', 'samsun',
    'üsküdar', 'şişli', 'fulya', 'move', 'çankaya', 'osmangazi',
    'konak', 'canik', 'izmit', 'en yakın', 'nerede', 'hangi', 'nerededir',
    'nasıl giderim', 'adres', 'konum', 'ulaşım'
  ];

  if (locationKeywords.some(word => lowerMessage.includes(word))) {
    return true;
  }

  // Check for physio-related keywords
  const physioKeywords = [
    'tedavi', 'ağrı', 'fizik', 'rehabilitasyon', 'terapi',
    'romatem', 'hastane', 'klinik', 'doktor', 'randevu',
    'şube', 'merkez', 'fıtık', 'boyun', 'bel', 'sırt', 'diz', 'omuz',
    'felç', 'inme', 'romatizma', 'ms', 'als', 'parkinson', 'serebral', 'palsi'
  ];

  return physioKeywords.some(keyword => lowerMessage.includes(keyword));
}