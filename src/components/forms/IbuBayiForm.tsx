import { ArrowLeft, Send, StickyNote, Baby } from 'lucide-react';
import type { IbuBayiOrderData, OrderItem } from '@/utils/booking';
import { emptyItem } from '@/utils/booking';
import { isValidWhatsAppNumber } from '@/utils/format';
import OrdererSection from '@/components/OrdererSection';
import ItemManager from '@/components/ItemManager';
import OrderSummary from '@/components/OrderSummary';
import { FormSection, Field, TextInput, TextArea, RadioGroup } from '@/components/FormPrimitives';
import FormHeader from '@/components/FormHeader';

interface Props {
  data: IbuBayiOrderData;
  onChange: (data: IbuBayiOrderData) => void;
  onBack: () => void;
  onSubmit: () => void;
  regionId: string;
}

const KEBUTUHAN_OPTS = ['Ibu', 'Bayi', 'Ibu & Bayi'] as const;

export default function IbuBayiForm({ data, onChange, onBack, onSubmit, regionId }: Props) {
  const set = (patch: Partial<IbuBayiOrderData>) => onChange({ ...data, ...patch, regionId });
  const setItems = (items: OrderItem[]) => set({ items });

  const valid =
    data.name.trim().length > 1 &&
    isValidWhatsAppNumber(data.whatsapp) &&
    !!data.date &&
    !!data.time &&
    data.location.trim().length > 3 &&
    data.namaIbu.trim().length > 1 &&
    !!data.kebutuhanUntuk &&
    data.items.length >= 1 &&
    data.items.every((it) => it.name.trim().length > 0 && parseInt(it.qty) > 0);

  const extraRows: { label: string; value: string }[] = [
    { label: 'Nama Ibu / Pemesan', value: data.namaIbu },
    { label: 'Kebutuhan Untuk', value: data.kebutuhanUntuk },
  ];

  return (
    <div className="space-y-5">
      <FormHeader categoryId="ibu-bayi" onBack={onBack} />

      <FormSection title="Detail Ibu & Bayi" eyebrow="Khusus Ibu/Bayi">
        <Field label="Nama Ibu / Pemesan" required>
          <TextInput
            value={data.namaIbu}
            onChange={(v) => set({ namaIbu: v })}
            placeholder="Nama ibu atau pemesan"
            icon={Baby}
          />
        </Field>
        <Field label="Kebutuhan Untuk">
          <RadioGroup value={data.kebutuhanUntuk} onChange={(v) => set({ kebutuhanUntuk: v as IbuBayiOrderData['kebutuhanUntuk'] })} options={KEBUTUHAN_OPTS} />
        </Field>
      </FormSection>

      <OrdererSection
        data={data}
        onChange={set}
        nameOverride={{ label: 'Nama Pemesan', placeholder: 'Nama Anda' }}
      />

      <ItemManager items={data.items} onChange={setItems} />

      <FormSection title="Catatan Tambahan" eyebrow="Opsional">
        <TextArea value={data.notes} onChange={(v) => set({ notes: v })} placeholder="Tulis informasi tambahan jika ada..." icon={StickyNote} />
      </FormSection>

      <OrderSummary categoryId="ibu-bayi" data={data} extraRows={extraRows} />

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

export function emptyIbuBayi(): IbuBayiOrderData {
  return {
    name: '', whatsapp: '', date: '', time: '', location: '', regionId: '',
    items: [emptyItem()], notes: '',
    namaIbu: '', kebutuhanUntuk: '',
  };
}
