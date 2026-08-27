import { ChevronRight, ShieldCheck, Clock4, ShoppingBag } from 'lucide-react';

interface Props {
  onCta: () => void;
}

export default function Hero({ onCta }: Props) {
  return (
    <section className="relative overflow-hidden px-1 py-8 sm:py-12">
      <div className="relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-dj-accent shadow-softer">
          Jasa Titip & Pengantaran
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          <span className="text-black">Dampingcare</span><span className="text-dj-accent">Jastip</span>
        </h1>
        <p className="mt-4 text-sm font-semibold leading-relaxed text-dj-ink">
          Jastip kebutuhan pasien/keluarga pasien? Jastip kebutuhan ibu melahirkan/bayi baru lahir? Jastip keperluan non pasien? Jastip makanan/minuman/barang untuk Area Solo, Sukoharjo, Boyolali, Karanganyar, Sragen, Klaten, Yogyakarta.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-dj-muted">
          Belum gabung grup? Join dulu grup WhatsApp wilayahmu, lalu isi form pemesanan. Setelah selesai, teks pesanan bisa disalin lalu kirim ke grup.
        </p>
        <button onClick={onCta} className="btn-primary mt-6">
          Pesan Sekarang <ChevronRight size={18} />
        </button>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <Pill icon={ShieldCheck} text="Aman & Terpercaya" />
          <Pill icon={Clock4} text="Tepat Waktu" />
          <Pill icon={ShoppingBag} text="4 Jenis Layanan" />
        </div>
      </div>
    </section>
  );
}

function Pill({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-dj-ink shadow-softer">
      <Icon size={13} className="text-dj-accent" /> {text}
    </span>
  );
}
