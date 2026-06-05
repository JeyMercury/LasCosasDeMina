'use client';
import { useState } from 'react';

interface Props {
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ navLinks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Botón hamburguesa */}
      <button
        className="text-[#3a693a] p-2"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        {open ? (
          // Icono X (cerrar)
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Icono hamburguesa
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#f8edf0]/95 backdrop-blur-md border-b border-[#3a693a]/10 shadow-md px-4 py-6 flex flex-col gap-4">
            {navLinks.map(link => (
                <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[#0a0909]/80 hover:text-[#3a693a] transition-colors text-lg font-medium"
                >
                    {link.name}
                </a>
            ))}
            <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-[#3a693a] text-[#f8edf0] hover:bg-[#2c502c] transition-all"
            >
                Contacto
            </a>
        </div>
        )}
    </div>
  );
}
