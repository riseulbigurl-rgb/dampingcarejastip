import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CATEGORIES, REGIONS, type CategoryId } from '@/config';
import {
  buildWhatsAppMessage,
  type PasienOrderData,
  type IbuBayiOrderData,
  type NonPasienOrderData,
  type JastipOrderData,
} from '@/utils/booking';
import { generateOrderId } from '@/utils/format';
import Hero from '@/components/Hero';
import CategoryPicker from '@/components/CategoryPicker';
import SuccessScreen from '@/components/SuccessScreen';
import RegionPicker from '@/components/RegionPicker';
import JoinGroupSection from '@/components/JoinGroupSection';
import PasienForm, { emptyPasien } from '@/components/forms/PasienForm';
import IbuBayiForm, { emptyIbuBayi } from '@/components/forms/IbuBayiForm';
import NonPasienForm, { emptyNonPasien } from '@/components/forms/NonPasienForm';
import JastipForm, { emptyJastip } from '@/components/forms/JastipForm';

type Screen = 'home' | 'form' | 'success';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [regionId, setRegionId] = useState('');
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [orderId, setOrderId] = useState('');

  const [waMessage, setWaMessage] = useState('');

  const [pasienData, setPasienData] = useState<PasienOrderData>(emptyPasien());
  const [ibuBayiData, setIbuBayiData] = useState<IbuBayiOrderData>(emptyIbuBayi());
  const [nonPasienData, setNonPasienData] = useState<NonPasienOrderData>(emptyNonPasien());
  const [jastipData, setJastipData] = useState<JastipOrderData>(emptyJastip());

  const scrollToCategories = () => {
    document.getElementById('pilih')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectCategory = (id: CategoryId) => {
    if (!regionId) return;
    setCategory(id);
    setScreen('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setScreen('home');
    setCategory(null);
    setTimeout(() => {
      document.getElementById('pilih')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const submit = (data: PasienOrderData | IbuBayiOrderData | NonPasienOrderData | JastipOrderData) => {
    if (!category) return;
    const cat = CATEGORIES.find((c) => c.id === category)!;
    const id = generateOrderId();
    setOrderId(id);

    const extraLines = buildExtraLines(category, data);
    const msg = buildWhatsAppMessage({
      categoryLabel: cat.label,
      data: data as PasienOrderData,
      extraLines,
      orderId: id,
    });
    setWaMessage(msg);
    setScreen('success');
  };

  const reset = () => {
    setScreen('home');
    setCategory(null);
    setOrderId('');
    setWaMessage('');
    setPasienData(emptyPasien());
    setIbuBayiData(emptyIbuBayi());
    setNonPasienData(emptyNonPasien());
    setJastipData(emptyJastip());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (screen === 'success') {
    const region = REGIONS.find((r) => r.id === regionId);
    return (
      <div className="min-h-screen bg-dj-bg">
        <Header />
        <SuccessScreen
          orderId={orderId}
          groupUrl={region?.whatsapp ?? ''}
          regionName={region?.name ?? ''}
          message={waMessage}
          onHome={reset}
        />
        <Footer />
      </div>
    );
  }

  if (screen === 'form' && category) {
    return (
      <div className="min-h-screen bg-dj-bg pb-10">
        <Header />
        <main className="mx-auto max-w-2xl px-4 pt-4">
          {category === 'pasien' && (
            <PasienForm data={pasienData} onChange={setPasienData} onBack={backToHome} onSubmit={() => submit(pasienData)} regionId={regionId} />
          )}
          {category === 'ibu-bayi' && (
            <IbuBayiForm data={ibuBayiData} onChange={setIbuBayiData} onBack={backToHome} onSubmit={() => submit(ibuBayiData)} regionId={regionId} />
          )}
          {category === 'non-pasien' && (
            <NonPasienForm data={nonPasienData} onChange={setNonPasienData} onBack={backToHome} onSubmit={() => submit(nonPasienData)} regionId={regionId} />
          )}
          {category === 'jastip' && (
            <JastipForm data={jastipData} onChange={setJastipData} onBack={backToHome} onSubmit={() => submit(jastipData)} regionId={regionId} />
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const region = REGIONS.find((r) => r.id === regionId);

  return (
    <div className="min-h-screen bg-dj-bg">
      <Header />
      <main className="mx-auto max-w-2xl px-4">
        <Hero onCta={scrollToCategories} />

        <section id="pilih" className="scroll-mt-4 space-y-5 pb-10 pt-2">
          <div>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-extrabold text-dj-muted shadow-softer">
                1
              </span>
              <h2 className="section-title">Pilih Wilayah Layanan</h2>
            </div>
            <RegionPicker value={regionId} onChange={setRegionId} />
          </div>

          {region && (
            <div className="animate-fade-up">
              <JoinGroupSection regionName={region.name} whatsappUrl={region.whatsapp} />
            </div>
          )}

          <div className={region ? '' : 'opacity-50 pointer-events-none'}>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ${region ? 'bg-dj-accent text-white' : 'bg-white text-dj-muted shadow-softer'}`}>
                2
              </span>
              <h2 className="section-title">Pilih Jenis Kebutuhan</h2>
            </div>
            {!region ? (
              <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white/40 px-4 py-3.5 text-center text-sm font-medium text-dj-muted">
                Pilih wilayah dulu untuk melanjutkan.
              </div>
            ) : (
              <CategoryPicker onSelect={selectCategory} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function buildExtraLines(
  category: CategoryId,
  data: PasienOrderData | IbuBayiOrderData | NonPasienOrderData | JastipOrderData,
): string[] {
  const lines: string[] = [];
  if (category === 'pasien') {
    const d = data as PasienOrderData;
    lines.push('', 'DETAIL PASIEN', `Nama Pasien: ${d.patientName}`);
    if (d.kebutuhanUntuk) lines.push(`Kebutuhan Untuk: ${d.kebutuhanUntuk}`);
    if (d.lokasiTujuan) {
      lines.push(`Lokasi Tujuan: ${d.lokasiTujuan}`);
      if (d.lokasiTujuan === 'Rumah Sakit' && d.namaRs) lines.push(`Nama RS: ${d.namaRs}`);
      if (d.lokasiTujuan === 'Rumah Sakit' && d.bangsalKamar) lines.push(`Bangsal/Kamar: ${d.bangsalKamar}`);
      if (d.lokasiTujuan === 'Rumah Sakit' && d.nomorBed) lines.push(`Nomor Bed: ${d.nomorBed}`);
      if (d.lokasiTujuan === 'Lainnya' && d.ketLokasi) lines.push(`Keterangan Lokasi: ${d.ketLokasi}`);
    }
  } else if (category === 'ibu-bayi') {
    const d = data as IbuBayiOrderData;
    lines.push('', 'DETAIL IBU & BAYI', `Nama Ibu / Pemesan: ${d.namaIbu}`);
    if (d.kebutuhanUntuk) lines.push(`Kebutuhan Untuk: ${d.kebutuhanUntuk}`);
  } else if (category === 'non-pasien') {
    const d = data as NonPasienOrderData;
    lines.push('', 'DETAIL KEPERLUAN', `Jenis Keperluan: ${d.jenisKeperluan}`);
    if (d.jenisKeperluan === 'Kebutuhan Lainnya' && d.ketKeperluan) lines.push(`Keterangan: ${d.ketKeperluan}`);
  } else if (category === 'jastip') {
    const d = data as JastipOrderData;
    lines.push('', 'DETAIL JASTIP', `Jenis Jastip: ${d.jenisJastip}`);
    if (d.namaToko) lines.push(`Nama Toko: ${d.namaToko}`);
    if (d.linkToko) lines.push(`Link Toko: ${d.linkToko}`);
  }
  return lines;
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-dj-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dj-accent text-white shadow-accent">
            <ShoppingBag size={20} />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold text-dj-ink">DampingcareJastip</p>
            <p className="text-[11px] font-medium text-dj-muted">Jasa Titip & Pengantaran</p>
          </div>
        </div>
        <a
          href="#pilih"
          className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-dj-accent shadow-softer transition hover:bg-dj-accent hover:text-white sm:inline-flex"
        >
          Pesan Sekarang
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/60">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dj-accent text-white">
            <ShoppingBag size={18} />
          </div>
          <p className="text-base font-extrabold text-dj-ink">DampingcareJastip</p>
        </div>
        <p className="mt-1 text-sm font-semibold text-dj-ink">Jasa Titip & Pengantaran Kebutuhan</p>
        <p className="mt-1 text-xs leading-relaxed text-dj-muted">
          Solo &bull; Sukoharjo &bull; Boyolali &bull; Karanganyar &bull; Sragen &bull; Klaten &bull; Yogyakarta
        </p>
      </div>
    </footer>
  );
}
