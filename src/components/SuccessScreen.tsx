import { useEffect, useState } from 'react';
import { CheckCircle2, Home, Copy, ClipboardCheck, AlertCircle, MessageCircle, Send } from 'lucide-react';

interface Props {
  orderId: string;
  groupUrl: string;
  regionName: string;
  message: string;
  onHome: () => void;
}

export default function SuccessScreen({ orderId, groupUrl, regionName, message, onHome }: Props) {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: user can manually select from textarea below
    }
  };

  const copyAndOpenGroup = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // clipboard may fail; user can copy manually from textarea
    }
    setSent(true);
    window.open(groupUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-start px-5 py-10 text-center">
      <div className="mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-dj-accent/12 animate-pop">
          <CheckCircle2 size={56} className="text-dj-accent" strokeWidth={2} />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-dj-ink">Pesanan Siap Dikirim</h2>
      <p className="mt-2 text-sm leading-relaxed text-dj-muted">
        Salin teks pesanan, lalu buka grup WhatsApp {regionName || 'wilayahmu'} dan tempel pesanannya.
      </p>

      <div className="mt-6 w-full rounded-2xl bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-dj-muted">Order ID</p>
            <p className="text-lg font-extrabold text-dj-ink">{orderId}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-amber-500">Menunggu Konfirmasi</span>
          </div>
        </div>
        {regionName && (
          <div className="mt-3 flex items-center gap-2 border-t border-black/5 pt-3">
            <MessageCircle size={15} className="text-dj-accent" />
            <span className="text-xs font-bold text-dj-ink">Grup Tujuan: {regionName}</span>
          </div>
        )}
      </div>

      <div className="mt-5 w-full space-y-3">
        <button onClick={copyAndOpenGroup} disabled={!groupUrl} className="btn-primary w-full">
          <Send size={18} /> Salin & Kirim ke Grup {regionName || 'Wilayah'}
        </button>
        <button onClick={copyMessage} className="btn-ghost w-full">
          {copied ? <><ClipboardCheck size={18} /> Tersalin!</> : <><Copy size={18} /> Salin Teks Saja</>}
        </button>
      </div>

      {sent && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-left">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-bold text-amber-700">Teks sudah tersalin & grup sudah terbuka!</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-600">
              Sekarang di grup {regionName}, <span className="font-bold">tahan kolom pesan</span>, pilih <span className="font-bold">Tempel</span>, lalu <span className="font-bold">Kirim</span>.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 w-full">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-dj-muted">Teks Pesanan</span>
        <textarea
          readOnly
          value={message}
          rows={8}
          onClick={(e) => e.currentTarget.select()}
          className="w-full resize-none rounded-2xl border border-black/5 bg-white p-3.5 font-mono text-[11px] leading-relaxed text-dj-ink shadow-softer focus:outline-none"
        />
      </div>

      <div className="mt-5 w-full">
        <button onClick={onHome} className="btn-ghost w-full">
          <Home size={18} /> Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
