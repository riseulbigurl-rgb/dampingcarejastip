import { formatDateID, getDayNameID } from '@/utils/format';
import { regionName } from '@/config';

export interface OrderItem {
  id: string;
  name: string;
  qty: string;
  satuan: string;
  notes: string;
}

export interface CommonOrderData {
  name: string;
  whatsapp: string;
  date: string;
  time: string;
  location: string;
  regionId: string;
  items: OrderItem[];
  notes: string;
}

export interface PasienOrderData extends CommonOrderData {
  patientName: string;
  kebutuhanUntuk: 'Pasien' | 'Keluarga Pasien' | 'Lainnya' | '';
  lokasiTujuan: 'Rumah Sakit' | 'Rumah' | 'Kost' | 'Lainnya' | '';
  namaRs: string;
  bangsalKamar: string;
  nomorBed: string;
  ketLokasi: string;
}

export interface IbuBayiOrderData extends CommonOrderData {
  namaIbu: string;
  kebutuhanUntuk: 'Ibu' | 'Bayi' | 'Ibu & Bayi' | '';
}

export interface NonPasienOrderData extends CommonOrderData {
  jenisKeperluan: 'Kebutuhan Pribadi' | 'Kebutuhan Kost' | 'Kebutuhan Rumah' | 'Kebutuhan Kerja' | 'Kebutuhan Lainnya' | '';
  ketKeperluan: string;
}

export interface JastipOrderData extends CommonOrderData {
  jenisJastip: 'Makanan' | 'Minuman' | 'Barang' | 'Campuran' | '';
  namaToko: string;
  linkToko: string;
}

export type OrderData = PasienOrderData | IbuBayiOrderData | NonPasienOrderData | JastipOrderData;

export function emptyItem(): OrderItem {
  return { id: cryptoId(), name: '', qty: '1', satuan: '', notes: '' };
}

function cryptoId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function buildWhatsAppMessage(opts: {
  categoryLabel: string;
  data: CommonOrderData;
  extraLines?: string[];
  orderId: string;
}): string {
  const { categoryLabel, data, extraLines = [], orderId } = opts;
  const rName = regionName(data.regionId);
  const lines: string[] = [
    'DAMPINGCAREJASTIP',
    `Order ID: ${orderId}`,
    '',
    'Halo, saya ingin melakukan pemesanan DampingcareJastip.',
    '',
    'Jenis Pesanan:',
    categoryLabel,
  ];

  if (rName) {
    lines.push('', 'Wilayah:', rName);
  }

  lines.push(
    '',
    'Nama Pemesan:',
    data.name,
    '',
    'Nomor WhatsApp:',
    data.whatsapp,
    '',
    'Tanggal Pengantaran:',
    formatDateID(data.date),
    '',
    'Hari:',
    getDayNameID(data.date),
    '',
    'Jam Pengantaran:',
    `${data.time} WIB`,
    '',
    'Alamat / Link Google Maps:',
    data.location,
  );

  if (extraLines.length > 0) {
    lines.push('', ...extraLines);
  }

  lines.push('', 'DAFTAR KEBUTUHAN:');
  data.items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.name || '-'}`,
      `   Jumlah: ${item.qty || '-'}${item.satuan ? ' ' + item.satuan : ''}`,
      `   Catatan: ${item.notes || '-'}`,
    );
  });

  lines.push(
    '',
    'Catatan Tambahan:',
    data.notes || '-',
    '',
    'Fee:',
    'Fee dapat dibicarakan secara personal melalui chat WhatsApp.',
    '',
    'Terima kasih.',
  );

  return lines.join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
