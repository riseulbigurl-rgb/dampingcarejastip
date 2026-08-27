export function formatDateID(iso: string): string {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function getDayNameID(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(d);
}

export function isValidWhatsAppNumber(input: string): boolean {
  const cleaned = input.replace(/[\s\-().]/g, '');
  if (!/^\d{8,15}$/.test(cleaned)) return false;
  if (cleaned.startsWith('0')) return cleaned.length >= 10 && cleaned.length <= 14;
  if (cleaned.startsWith('62')) return cleaned.length >= 10 && cleaned.length <= 15;
  return false;
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateOrderId(): string {
  let s = '';
  for (let i = 0; i < 5; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `DJ-${s}`;
}
