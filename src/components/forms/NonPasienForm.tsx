import { ArrowLeft, Send, StickyNote } from 'lucide-react';
import type { NonPasienOrderData, OrderItem } from '@/utils/booking';
import { emptyItem } from '@/utils/booking';
import { isValidWhatsAppNumber } from '@/utils/format';
import OrdererSection from '@/components/OrdererSection';
import ItemManager from '@/components/ItemManager';
import OrderSummary from '@/components/OrderSummary';
import { FormSection, Field, TextArea, RadioGroup } from '@/components/FormPrimitives';
import FormHeader from '@/components/FormHeader';

interface Props {
  data: NonPasienOrderData;
  onChange: (data: NonPasienOrderData) => void;
  onBack: () => void;
  onSubmit: () => void;
  regionId: string;
}

const JENIS_OPTS = ['Kebutuhan Pribadi', 'Kebutuhan Kost', 'Kebutuhan Rumah', 'Kebutuhan Kerja', 'Kebutuhan Lainnya'] as const;

export default function NonPasienForm({ data, onChange, onBack, onSubmit, regionId }: Props) {
  const set = (patch: Partial<NonPasienOrderData>) => onChange({ ...data, ...patch, regionId });
  const setItems = (items: OrderItem[]) => set({ items });

  const valid =
    data.name.trim().length > 1 &&
    isValidWhatsAppNumber(data.whatsapp) &&
    !!data.date &&
    !!data.time &&
    data.location.trim().length > 3 &&
    !!data.jenisKeperluan &&
    (data.jenisKeperluan !== 'Kebutuhan Lainnya' || data.ketKeperluan.trim().length > 0) &&
    data.items.length >= 1 &&
    data.items.every((it) => it.name.trim().length > 0 && parseInt(it.qty) > 0);

  const extraRows: { label: string; value: string }[] = [
    { label: 'Jenis Keperluan', value: data.jenisKeperluan === 'Kebutuhan Lainnya' ? `Lainnya — ${data.ketKeperluan}` : data.jenisKeperluan },
  ];

  return (
    <div className="space-y-5">
      <FormHeader categoryId="non-pasien" onBack={onBack} />

      <FormSection title="Detail Keperluan" eyebrow="Khusus Non Pasien">
        <Field label="Jenis Keperluan" required>
          <RadioGroup value={data.jenisKeperluan} onChange={(v) => set({ jenisKeperluan: v as NonPasienOrderData['jenisKeperluan'] })} options={JENIS_OPTS} />
        </Field>
        {data.jenisKeperluan === 'Kebutuhan Lainnya' && (
          <Field label="Keterangan Keperluan" required>
            <TextArea value={data.ketKeperluan} onChange={(v) => set({ ketKeperluan: v })} placeholder="Jelaskan jenis keperluan Anda" />
          </Field>
        )}
      </FormSection>

      <OrdererSection data={data} onChange={set} />

      <ItemManager items={data.items} onChange={setItems} />

      <FormSection title="Catatan Tambahan" eyebrow="Opsional">
        <TextArea value={data.notes} onChange={(v) => set({ notes: v })} placeholder="Tulis informasi tambahan jika ada..." icon={StickyNote} />
      </FormSection>

      <OrderSummary categoryId="non-pasien" data={data} extraRows={extraRows} />

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

export function emptyNonPasien(): NonPasienOrderData {
  return {
    name: '', whatsapp: '', date: '', time: '', location: '', regionId: '',
    items: [emptyItem()], notes: '',
    jenisKeperluan: '', ketKeperluan: '',
  };
}
