import { Receipt, MessageCircle } from 'lucide-react';
import type { CategoryId } from '@/config';
import { CATEGORIES, FEE_NOTE, regionName } from '@/config';
import type { CommonOrderData } from '@/utils/booking';
import { formatDateID, getDayNameID } from '@/utils/format';

interface Props {
  categoryId: CategoryId;
  data: CommonOrderData;
  extraRows?: { label: string; value: string }[];
}

export default function OrderSummary({ categoryId, data, extraRows = [] }: Props) {
  const category = CATEGORIES.find((c) => c.id === categoryId)!;

  const rows = [
    { label: 'Jenis Pesanan', value: category.label },
    { label: 'Wilayah', value: regionName(data.regionId) },
    { label: 'Nama Pemesan', value: data.name },
    { label: 'WhatsApp', value: data.whatsapp },
    { label: 'Tanggal', value: formatDateID(data.date) },
    { label: 'Hari', value: getDayNameID(data.date) },
    { label: 'Jam', value: `${data.time} WIB` },
    { label: 'Lokasi Pengantaran', value: data.location },
    ...extraRows,
  ];

  return (
    <div className="card overflow-hidden animate-fade-up">
      <div className="bg-dj-accent px-5 py-4 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Ringkasan Pesanan</p>
      </div>

      <div className="p-5">
        <dl className="space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col gap-0.5 border-b border-black/5 pb-3 last:border-0 last:pb-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-dj-muted">{r.label}</dt>
              <dd className="break-words text-sm font-semibold text-dj-ink">{r.value || '-'}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 rounded-2xl bg-dj-bg/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-dj-ink">
            <Receipt size={15} />
            <span className="text-xs font-bold uppercase tracking-wide">Daftar Kebutuhan</span>
          </div>
          <ol className="space-y-2.5">
            {data.items.map((item, i) => (
              <li key={item.id} className="flex gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-dj-accent/12 text-xs font-bold text-dj-accent">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-dj-ink">
                    {item.name || '-'} <span className="text-dj-muted">— {item.qty}{item.satuan ? ' ' + item.satuan : ''}</span>
                  </p>
                  {item.notes && <p className="text-xs text-dj-muted">Catatan: {item.notes}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {data.notes && (
          <div className="mt-3 rounded-2xl bg-dj-bg/40 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-dj-muted">Catatan Tambahan</p>
            <p className="mt-1 text-sm text-dj-ink">{data.notes}</p>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 p-3.5">
          <MessageCircle size={16} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed font-medium text-amber-700">{FEE_NOTE}</p>
        </div>
      </div>
    </div>
  );
}
