import { User, Phone, Calendar, Clock, MapPin, CalendarDays } from 'lucide-react';
import type { CommonOrderData } from '@/utils/booking';
import { getDayNameID, isValidWhatsAppNumber } from '@/utils/format';
import { FormSection, Field, TextInput, TextArea } from '@/components/FormPrimitives';

interface Props {
  data: CommonOrderData;
  onChange: (patch: Partial<CommonOrderData>) => void;
  nameOverride?: { label: string; placeholder: string };
}

export default function OrdererSection({ data, onChange, nameOverride }: Props) {
  const day = data.date ? getDayNameID(data.date) : '';
  const waError = data.whatsapp.length > 0 && !isValidWhatsAppNumber(data.whatsapp);

  return (
    <>
      <FormSection title="Informasi Pemesan" eyebrow="Langkah 1">
        <Field label={nameOverride?.label ?? 'Nama Pemesan'} required>
          <TextInput
            value={data.name}
            onChange={(v) => onChange({ name: v })}
            placeholder={nameOverride?.placeholder ?? 'Nama lengkap Anda'}
            icon={User}
          />
        </Field>

        <Field label="Nomor WhatsApp" required error={waError ? 'Format nomor WhatsApp tidak valid.' : undefined}>
          <TextInput
            value={data.whatsapp}
            onChange={(v) => onChange({ whatsapp: v })}
            placeholder="08xxxxxxxxxx"
            type="tel"
            inputMode="tel"
            icon={Phone}
          />
        </Field>
      </FormSection>

      <FormSection title="Jadwal Pengantaran" eyebrow="Langkah 2">
        <Field label="Tanggal Pengantaran" required>
          <TextInput value={data.date} onChange={(v) => onChange({ date: v })} type="date" icon={Calendar} />
        </Field>

        {day && (
          <div className="flex items-center gap-2 rounded-xl bg-dj-bg/60 px-3.5 py-3 animate-fade-up">
            <CalendarDays size={16} className="text-dj-accent" />
            <span className="text-sm font-semibold text-dj-ink">Hari: {day}</span>
          </div>
        )}

        <Field label="Jam Pengantaran" required>
          <TextInput value={data.time} onChange={(v) => onChange({ time: v })} type="time" icon={Clock} />
        </Field>
      </FormSection>

      <FormSection title="Lokasi Pengantaran" eyebrow="Langkah 3">
        <Field label="Alamat / Link Google Maps Pengantaran" required>
          <TextArea
            value={data.location}
            onChange={(v) => onChange({ location: v })}
            placeholder="Masukkan alamat lengkap atau link Google Maps"
            rows={3}
            icon={MapPin}
          />
        </Field>
        <p className="-mt-2 text-[11px] leading-relaxed text-dj-muted">
          Bisa berupa alamat lengkap atau link Google Maps (buka Google Maps &gt; cari lokasi &gt; Share &gt; Salin link).
        </p>
      </FormSection>
    </>
  );
}
