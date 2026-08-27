import { CATEGORIES, type CategoryId } from '@/config';

interface Props {
  categoryId: CategoryId;
  onBack: () => void;
}

export default function FormHeader({ categoryId, onBack }: Props) {
  const category = CATEGORIES.find((c) => c.id === categoryId)!;
  const Icon = category.icon;
  return (
    <div className="card overflow-hidden">
      <div className="bg-dj-accent px-5 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Icon size={26} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">{category.number} — {category.short}</p>
            <h2 className="text-lg font-extrabold leading-tight">{category.formTitle}</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/90">{category.formDescription}</p>
      </div>
      <button onClick={onBack} className="btn-ghost w-full rounded-none border-x-0 border-b-0">
        ← Kembali ke Pilihan
      </button>
    </div>
  );
}
