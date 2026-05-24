'use client';
import { useState, useRef } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const inputClass = "w-full px-5 py-3.5 bg-[#f8edf0]/50 border border-[#3a693a]/20 rounded-lg focus:ring-2 focus:ring-[#3a693a] focus:border-[#3a693a] outline-none transition-all placeholder:text-gray-400";
  const labelClass = "block text-sm font-bold text-[#3a693a] mb-2";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Error desconocido.');
        setStatus('error');
        return;
      }
      setStatus('success');
      formRef.current?.reset();
      setFileName('');
    } catch {
      setErrorMsg('No se pudo enviar. Comprueba tu conexión e inténtalo de nuevo.');
      setStatus('error');
    }
  }

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#3a693a] tracking-tight mb-5">¿Hablamos?</h2>
          <p className="text-lg text-gray-700">Cuéntanos tu idea y te haremos un presupuesto a medida sin compromiso.</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-10 md:p-12 rounded-3xl shadow-md border border-[#3a693a]/10"
        >
          {/* Campo honeypot — oculto para humanos, los bots lo rellenan */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className={labelClass}>Nombre Completo</label>
              <input type="text" id="name" name="name" required placeholder="Juan Pérez" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Correo Electrónico</label>
              <input type="email" id="email" name="email" required placeholder="juan@email.com" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>¿Qué necesitas personalizar?</label>
            <textarea id="message" name="message" rows={6} required placeholder="Describe tu idea, cantidad, material..." className={`${inputClass} resize-y`} />
          </div>

          {/* Adjunto */}
          <div>
            <label className={labelClass}>Adjuntar archivo <span className="font-normal text-gray-500">(opcional · máx. 2 MB · imagen, audio o texto)</span></label>
            <label className="flex items-center gap-3 cursor-pointer w-full px-5 py-3.5 bg-[#f8edf0]/50 border border-dashed border-[#3a693a]/40 rounded-lg hover:border-[#3a693a] transition-all">
              <svg className="w-5 h-5 text-[#3a693a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-sm text-gray-500 truncate">{fileName || 'Selecciona un archivo...'}</span>
              <input
                type="file"
                name="attachment"
                accept="image/*,audio/*,text/plain"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
              />
            </label>
          </div>

          {/* Mensajes de estado */}
          {status === 'error' && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">{errorMsg}</p>
          )}
          {status === 'success' && (
            <p className="text-[#3a693a] text-sm text-center bg-green-50 p-3 rounded-lg font-semibold">
              ¡Mensaje enviado! Te responderemos lo antes posible.
            </p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center px-12 py-3 font-semibold rounded-md transition-all duration-200 bg-[#3a693a] text-[#f8edf0] hover:bg-[#2c502c] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
