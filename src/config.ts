import type { LucideIcon } from 'lucide-react';
import { HeartPulse, Baby, UserRound, UtensilsCrossed } from 'lucide-react';

export type CategoryId = 'pasien' | 'ibu-bayi' | 'non-pasien' | 'jastip';

export interface CategoryConfig {
  id: CategoryId;
  number: string;
  label: string;
  short: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  formTitle: string;
  formDescription: string;
}

export interface RegionConfig {
  id: string;
  name: string;
  whatsapp: string;
}

export const ADMIN_WHATSAPP = '6281234567890';

export const REGIONS: RegionConfig[] = [
  { id: 'solo', name: 'Solo (Surakarta)', whatsapp: 'https://chat.whatsapp.com/DQviHP2VuQRAfeyLWgHfbH?s=cl&p=a&mlu=4' },
  { id: 'karanganyar', name: 'Karanganyar', whatsapp: 'https://chat.whatsapp.com/LuvUIfzqqatARnFyYwcEFm?s=sh&p=a&mlu=4' },
  { id: 'sukoharjo', name: 'Sukoharjo', whatsapp: 'https://chat.whatsapp.com/KpY6497rBmZJBBKmzoRj9q?s=cl&p=a&mlu=4' },
  { id: 'sragen', name: 'Sragen', whatsapp: 'https://chat.whatsapp.com/KVdFO8IeKwQ7N86m25Z6d1?s=cl&p=a&mlu=4' },
  { id: 'boyolali', name: 'Boyolali', whatsapp: 'https://chat.whatsapp.com/CC9HhDSZcPwCvV2KEDgI6P?s=cl&p=a&mlu=4' },
  { id: 'yogyakarta', name: 'Yogyakarta', whatsapp: 'https://chat.whatsapp.com/JNbrP7sQwRpHTTBK1ixvZX?s=cl&p=a&mlu=4' },
  { id: 'klaten', name: 'Klaten', whatsapp: 'https://chat.whatsapp.com/Iog3TRNdecdHIxmjh8LnKd?s=cl&p=a&mlu=4' },
];

export function regionName(id: string): string {
  return REGIONS.find((r) => r.id === id)?.name ?? '';
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'pasien',
    number: '01',
    label: 'Keperluan Pasien',
    short: 'Pasien',
    icon: HeartPulse,
    description: 'Untuk kebutuhan pasien yang perlu diantar ke RS, rumah, kost, atau lokasi lainnya.',
    bullets: ['Rumah Sakit', 'Rumah', 'Kost', 'Lokasi lainnya'],
    formTitle: 'Form Keperluan Pasien',
    formDescription: 'Untuk kebutuhan pasien yang perlu diantar ke RS, rumah, kost, atau lokasi lainnya.',
  },
  {
    id: 'ibu-bayi',
    number: '02',
    label: 'Ibu Melahirkan / Bayi Baru Lahir',
    short: 'Ibu & Bayi',
    icon: Baby,
    description: 'Untuk kebutuhan ibu melahirkan, pasca melahirkan, bayi baru lahir, dan kebutuhan ibu & bayi.',
    bullets: ['Ibu melahirkan', 'Ibu pasca melahirkan', 'Bayi baru lahir', 'Kebutuhan ibu & bayi'],
    formTitle: 'Form Kebutuhan Ibu Melahirkan / Bayi Baru Lahir',
    formDescription: 'Untuk kebutuhan ibu melahirkan, pasca melahirkan, bayi baru lahir, dan kebutuhan ibu & bayi.',
  },
  {
    id: 'non-pasien',
    number: '03',
    label: 'Keperluan Non Pasien',
    short: 'Non Pasien',
    icon: UserRound,
    description: 'Untuk berbagai kebutuhan pribadi/non-pasien yang membutuhkan titip beli atau pengantaran.',
    bullets: ['Kebutuhan pribadi', 'Kebutuhan kost', 'Kebutuhan rumah', 'Kebutuhan lainnya'],
    formTitle: 'Form Keperluan Non Pasien',
    formDescription: 'Untuk berbagai kebutuhan pribadi yang membutuhkan bantuan titip beli atau pengantaran.',
  },
  {
    id: 'jastip',
    number: '04',
    label: 'Jastip Makanan, Minuman & Barang',
    short: 'Jastip',
    icon: UtensilsCrossed,
    description: 'Titip beli makanan, minuman, barang, atau kebutuhan lainnya.',
    bullets: ['Makanan', 'Minuman', 'Barang', 'Kebutuhan lainnya'],
    formTitle: 'Form Jastip Makanan, Minuman & Barang',
    formDescription: 'Titip beli makanan, minuman, barang, atau kebutuhan lainnya.',
  },
];

export const SATUAN_OPTIONS = ['pcs', 'bungkus', 'botol', 'box', 'pack', 'buah', 'lainnya'] as const;

export const FEE_NOTE = 'Fee dapat dibicarakan secara personal melalui chat WhatsApp.';
