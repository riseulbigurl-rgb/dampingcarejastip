import { ArrowLeft, Send, StickyNote, HeartPulse } from 'lucide-react';
import type { PasienOrderData, OrderItem } from '@/utils/booking';
import { emptyItem } from '@/utils/booking';
import { isValidWhatsAppNumber } from '@/utils/format';
import OrdererSection from '@/components/OrdererSection';
import ItemManager from '@/components/ItemManager';
import OrderSummary from '@/components/OrderSummary';
import FormHeader from '@/components/FormHeader';
import { FormSection, Field, TextInput, TextArea, RadioGroup } from '@/components/FormPrimitives';

interface Props {
  data: PasienOrderData;
  onChange: (data: PasienOrderData) => void;
  onBack: () => void;
  onSubmit: () => void;
  regionId: string;
}

const KEBUTUHAN_OPTS = ['Pasien', 'Keluarga Pasien', 'Lainnya'] as const;
const LOKASI_OPTS = ['Rumah Sakit', 'Rumah', 'Kost', 'Lainnya'] as const;

export default function PasienForm({ data, onChange, onBack, onSubmit, regionId }: Props) {
  const set = (patch: Partial<PasienOrderData>) => onChange({ ...data, ...patch, regionId });
  const setItems = (items: OrderItem[]) => set({ items });

  const valid =
    data.name.trim().length > 1 &&
    isValidWhatsAppNumber(data.whatsapp) &&
    !!data.date &&
    !!data.time &&
    data.location.trim().length > 3 &&
    data.patientName.trim().length > 1 &&
    !!data.lokasiTujuan &&
    (data.lokasiTujuan !== 'Rumah Sakit' || data.namaRs.trim().length > 0) &&
    (data.lokasiTujuan !== 'Lainnya' || data.ketLokasi.trim().length > 0) &&
    data.items.length >= 1 &&
    data.items.every((it) => it.name.trim().length > 0 && parseInt(it.qty) > 0);

  const extraRows: { label: string; value: string }[] = [
    { label: 'Nama Pasien', value: data.patientName },
    { label: 'Kebutuhan Untuk', value: data.kebutuhanUntuk },
    { label: 'Lokasi Tujuan', value: data.lokasiTujuan === 'Rumah Sakit' ? `Rumah Sakit — ${data.namaRs}` : data.lokasiTujuan === 'Lainnya' ? `Lainnya — ${data.ketLokasi}` : data.lokasiTujuan },
  ];

  return (
    <div className="space-y-5">
      <FormHeader categoryId="pasien" onBack={onBack} />

      <FormSection title="Detail Pasien" eyebrow="Khusus Pasien">
        <Field label="Nama Pasien" required>
          <TextInput
            value={data.patientName}
            onChange={(v) => set({ patientName: v })}
            placeholder="Nama pasien"
            icon={HeartPulse}
          />
        </Field>
        <Field label="Kebutuhan Untuk">
          <RadioGroup value={data.kebutuhanUntuk} onChange={(v) => set({ kebutuhanUntuk: v as PasienOrderData['kebutuhanUntuk'] })} options={KEBUTUHAN_OPTS} />
        </Field>
        <Field label="Lokasi Tujuan">
          <RadioGroup value={data.lokasiTujuan} onChange={(v) => set({ lokasiTujuan: v as PasienOrderData['lokasiTujuan'] })} options={LOKASI_OPTS} />
        </Field>
        {data.lokasiTujuan === 'Rumah Sakit' && (
          <Field label="Nama Rumah Sakit" required>
            <TextInput value={data.namaRs} onChange={(v) => set({ namaRs: v })} placeholder="Contoh: RS Dr. Moewardi" />
          </Field>
        )}
        {data.lokasiTujuan === 'Lainnya' && (
          <Field label="Keterangan Lokasi" required>
            <TextArea value={data.ketLokasi} onChange={(v) => set({ ketLokasi: v })} placeholder="Jelaskan lokasi tujuan" />
          </Field>
        )}
      </FormSection>

      <OrdererSection data={data} onChange={set} />

      <ItemManager items={data.items} onChange={setItems} />

      <FormSection title="Catatan Tambahan" eyebrow="Opsional">
        <TextArea value={data.notes} onChange={(v) => set({ notes: v })} placeholder="Tulis informasi tambahan jika ada..." icon={StickyNote} />
      </FormSection>

      <OrderSummary categoryId="pasien" data={data} extraRows={extraRows} />

      <button onClick={onSubmit} disabled={!valid} className="btn-primary w-full text-base">
        <Send size={18} /> Kirim Pesanan via WhatsApp
      </button>
      {!valid && (
        <p className="text-center text-xs font-medium text-dj-muted">
          Lengkapi semua field bertanda * untuk mengirim pesanan.
        </p>
      )}

      <button onClick={onBack} className="btn-ghost w-full">
        <ArrowLeft size={18} /> Kembali ke Pilihan
      </button>
    </div>
  );
}

export function emptyPasien(): PasienOrderData {
  return {
    name: '', whatsapp: '', date: '', time: '', location: '', regionId: '',
    items: [emptyItem()], notes: '',
    patientName: '', kebutuhanUntuk: '', lokasiTujuan: '', namaRs: '', ketLokasi: '',
  };
}
