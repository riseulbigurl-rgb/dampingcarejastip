import { MessageCircle, ChevronDown } from 'lucide-react';

interface Props {
  regionName: string;
  whatsappUrl: string;
}

export default function JoinGroupSection({ regionName, whatsappUrl }: Props) {
  return (
    <div className="rounded-2xl bg-white/60 p-5 text-center shadow-softer">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-softer">
        <MessageCircle size={24} className="text-dj-accent" />
      </div>
      <h3 className="text-base font-extrabold text-dj-ink">Belum Gabung Grup DampingcareJastip?</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-dj-muted">
        Jika belum gabung grup, kamu bisa join dulu grup WhatsApp wilayah {regionName} sebelum mengisi form pemesanan di bawah.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-dj-accent px-5 py-3 text-sm font-bold text-white shadow-accent transition hover:bg-dj-accentDark"
      >
        <MessageCircle size={18} /> Join Grup WhatsApp {regionName}
      </a>

      <p className="mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-dj-muted">
        Sudah join grup? Silakan lanjut pilih jenis kebutuhan di bawah
        <ChevronDown size={13} className="animate-bounce" />
      </p>
    </div>
  );
}
