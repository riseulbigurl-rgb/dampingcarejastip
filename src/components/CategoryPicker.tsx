import { ChevronRight } from 'lucide-react';
import { CATEGORIES, type CategoryId } from '@/config';

interface Props {
  onSelect: (id: CategoryId) => void;
}

export default function CategoryPicker({ onSelect }: Props) {
  return (
    <section id="pilih" className="scroll-mt-4 space-y-4 pb-10 pt-2">
      <div className="text-center">
        <p className="section-eyebrow">Pilih Jenis Kebutuhan</p>
        <h2 className="section-title mt-1">Mau pesan apa hari ini?</h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-dj-muted">
          Pilih salah satu kategori di bawah, lalu isi form khusus untuk pesanan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="group flex flex-col rounded-3xl bg-white p-5 text-left shadow-soft transition-all duration-200 hover:shadow-accent hover:-translate-y-0.5 animate-fade-up"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dj-bg text-dj-accent transition group-hover:bg-dj-accent group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>
                <span className="text-2xl font-extrabold text-dj-bg">{cat.number}</span>
              </div>
              <p className="mt-4 text-base font-bold text-dj-ink">{cat.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-dj-muted">{cat.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {cat.bullets.map((b) => (
                  <li key={b} className="rounded-full bg-dj-bg/60 px-2.5 py-1 text-[11px] font-semibold text-dj-ink/80">
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-dj-accent">
                Pilih <ChevronRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
