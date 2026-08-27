import { Plus, Trash2, Package } from 'lucide-react';
import type { OrderItem } from '@/utils/booking';
import { emptyItem } from '@/utils/booking';
import { SATUAN_OPTIONS } from '@/config';
import { Field, TextInput, TextArea, Select } from '@/components/FormPrimitives';

interface Props {
  items: OrderItem[];
  onChange: (items: OrderItem[]) => void;
  itemLabel?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  notesLabel?: string;
}

export default function ItemManager({
  items,
  onChange,
  itemLabel = 'Daftar Kebutuhan',
  nameLabel = 'Nama Item / Kebutuhan',
  namePlaceholder = 'Contoh: Nasi Padang',
  notesLabel = 'Catatan Item',
}: Props) {
  const update = (id: string, patch: Partial<OrderItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const add = () => {
    onChange([...items, emptyItem()]);
  };

  const remove = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="card p-5">
      <div className="mb-1 flex items-center gap-2">
        <Package size={16} className="text-dj-accent" />
        <p className="section-eyebrow">{itemLabel}</p>
      </div>
      <p className="text-sm text-dj-muted">Tambahkan barang satu per satu. Minimal 1 item.</p>

      <div className="mt-4 space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-2xl border border-black/5 bg-dj-bg/40 p-4 animate-fade-up">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-dj-accent">Item {idx + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                >
                  <Trash2 size={13} /> Hapus
                </button>
              )}
            </div>

            <div className="space-y-3">
              <Field label={nameLabel} required>
                <TextInput
                  value={item.name}
                  onChange={(v) => update(item.id, { name: v })}
                  placeholder={namePlaceholder}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Jumlah" required>
                  <TextInput
                    value={item.qty}
                    onChange={(v) => update(item.id, { qty: v })}
                    type="number"
                    inputMode="numeric"
                    placeholder="1"
                  />
                </Field>
                <Field label="Satuan">
                  <Select
                    value={item.satuan}
                    onChange={(v) => update(item.id, { satuan: v })}
                    options={SATUAN_OPTIONS}
                    placeholder="Pilih satuan"
                  />
                </Field>
              </div>

              <Field label={notesLabel}>
                <TextArea
                  value={item.notes}
                  onChange={(v) => update(item.id, { notes: v })}
                  placeholder="Contoh: 1 rendang, 1 ayam"
                  rows={2}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-dj-accent/30 bg-white/50 py-3.5 text-sm font-bold text-dj-accent transition hover:border-dj-accent hover:bg-dj-accent/5"
      >
        <Plus size={18} /> Tambah Item
      </button>
    </div>
  );
}
