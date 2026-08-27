import { ArrowLeft, Send, StickyNote, Store, MapPin } from 'lucide-react';
import type { JastipOrderData, OrderItem } from '@/utils/booking';
import { emptyItem } from '@/utils/booking';
import { isValidWhatsAppNumber } from '@/utils/format';
import OrdererSection from '@/components/OrdererSection';
import ItemManager from '@/components/ItemManager';
import OrderSummary from '@/components/OrderSummary';
import { FormSection, Field, TextInput, TextArea, RadioGroup } from '@/components/FormPrimitives';
import FormHeader from '@/components/FormHeader';

interface Props {
  data: JastipOrderData;
  onChange: (data: JastipOrderData) => void;
  onBack: () => void;
  onSubmit: () => void;
  regionId: string;
}

const JENIS_JASTIP_OPTS = ['Makanan', 'Minuman', 'Barang', 'Campuran'] as const;

export default function JastipForm({ data, onChange, onBack, onSubmit, regionId }: Props) {
  const set = (patch: Partial<JastipOrderData>) => onChange({ ...data, ...patch, regionId });
  const setItems = (items: OrderItem[]) => set({ items });

  const valid =
    data.name.trim().length > 1 &&
    isValidWhatsAppNumber(data.whatsapp) &&
    !!data.date &&
    !!data.time &&
    data.location.trim().length > 3 &&
    !!data.jenisJastip &&
    data.items.length >= 1 &&
    data.items.every((it) => it.name.trim().length > 0 && parseInt(it.qty) > 0);

  const extraRows: { label: string; value: string }[] = [
    { label: 'Jenis Jastip', value: data.jenisJastip },
    { label: 'Nama Toko', value: data.namaToko || '-' },
    { label: 'Link Toko', value: data.linkToko || '-' },
  ];

  return (
    <div className="space-y-5">
      <FormHeader categoryId="jastip" onBack={onBack} />

      <FormSection title="Detail Jastip" eyebrow="Khusus Jastip">
        <Field label="Jenis Jastip" required>
          <RadioGroup value={data.jenisJastip} onChange={(v) => set({ jenisJastip: v as JastipOrderData['jenisJastip'] })} options={JENIS_JASTIP_OPTS} />
        </Field>
        <Field label="Nama Toko / Tempat Pembelian">
          <TextInput value={data.namaToko} onChange={(v) => set({ namaToko: v })} placeholder="Contoh: Warung Bu Sri (opsional)" icon={Store} />
        </Field>
        <Field label="Link Google Maps Toko / Tempat Pembelian">
          <TextInput value={data.linkToko} onChange={(v) => set({ linkToko: v })} placeholder="Link Google Maps toko (opsional)" icon={MapPin} />
        </Field>
      </FormSection>

      <OrdererSection data={data} onChange={set} />

      <ItemManager
        items={data.items}
        onChange={setItems}
        itemLabel="Daftar Pesanan"
        nameLabel="Nama Makanan / Minuman / Barang"
        namePlaceholder="Contoh: Nasi Goreng"
        notesLabel="Catatan Pesanan"
      />

      <FormSection title="Catatan Tambahan" eyebrow="Opsional">
        <TextArea value={data.notes} onChange={(v) => set({ notes: v })} placeholder="Tulis informasi tambahan jika ada..." icon={StickyNote} />
      </FormSection>

      <OrderSummary categoryId="jastip" data={data} extraRows={extraRows} />

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

export function emptyJastip(): JastipOrderData {
  return {
    name: '', whatsapp: '', date: '', time: '', location: '', regionId: '',
    items: [emptyItem()], notes: '',
    jenisJastip: '', namaToko: '', linkToko: '',
  };
}
