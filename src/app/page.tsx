import React from 'react';

// --- Componentes UI Reutilizables ---

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, href, variant = 'primary', className = '', type = 'button' }: ButtonProps) => {
  const baseClass = "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a693a]";
 
  // Implementación exacta de la paleta solicitada con estados hover
  const variants = {
    primary: `bg-[#3a693a] text-[#f8edf0] text-md font-mulish hover:bg-[#2c502c] shadow-sm`, // Verde principal con hover más oscuro
    secondary: `bg-[#eadadf] text-[#0a0909] text-md font-mulish hover:bg-[#dbccd1]`, // Fondo secundario con hover
  };

  const finalClass = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} className={finalClass}>{children}</a>;
  }
  return <button type={type} className={finalClass}>{children}</button>;
};

interface ServiceCardProps {
  title: string;
  description: string;
  iconType: 'laser' | 'uv' | 'sublimation';
}

const ServiceCard = ({ title, description, iconType }: ServiceCardProps) => {
  const icons = {
    laser: (
      <svg className="w-8 h-8 text-[#3a693a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    uv: (
      <svg className="w-8 h-8 text-[#3a693a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    sublimation: (
      <svg className="w-8 h-8 text-[#3a693a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h10M7 11h10M7 15h10M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="w-16 h-16 rounded-full bg-[#f8edf0] flex items-center justify-center mb-6">
        {icons[iconType]}
      </div>
      <h3 className="text-xl font-bold text-[#3a693a] mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

// --- Componente Principal de la Página ---
export default function LasCosasDeMinaPage() {
  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Nosotros', href: '#nosotros' },
  ];

  const galleryImages = [
    "mina_disco_madera.jpg",
    "mina_perchas.jpg",
    "mina_botella_copas.jpg",
    "mina_cuadro_mensaje.jpg",
    "mina_camisetas.jpg",
    "mina_reloj.jpg",
    "mina_hogwarts.jpg",
    "mina_maleta.jpg",
    "mina_botella.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#f8edf0] flex flex-col font-sans antialiased text-gray-800">
     
      {/* 1. HEADER & NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#f8edf0]/90 backdrop-blur-md border-b border-[#3a693a]/10 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-25 flex items-center justify-between">
          <div className='flex items-center gap-4'>
            <img src="logo_MINA_bg.png" className='w-20'></img>
            <a href="#inicio" className="text-2xl font-semibold font-mulish text-[#0a0909]">
              Las cosas de MINA
            </a>
          </div>
         
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-m text-[#0a0909]/80 hover:text-[#3a693a] transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-7">
            <a aria-label="Instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/las_cosasdemina/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="size-5 @tablet:size-3">
                <path fill="currentColor" fill-rule="evenodd" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m0 3.75c-1.697 0-1.91.007-2.577.038-.665.03-1.12.136-1.517.29-.411.16-.76.374-1.107.721a3.1 3.1 0 0 0-.72 1.107c-.155.398-.261.852-.291 1.517-.03.667-.038.88-.038 2.577s.007 1.91.038 2.577c.03.665.136 1.12.29 1.517.16.411.374.76.721 1.107.347.348.696.561 1.107.72.398.155.852.261 1.517.291.667.03.88.038 2.577.038s1.91-.007 2.577-.038c.665-.03 1.12-.136 1.517-.29.411-.16.76-.373 1.107-.721.348-.348.561-.696.72-1.107.155-.398.261-.852.291-1.517.03-.667.038-.88.038-2.577s-.007-1.91-.038-2.577c-.03-.665-.136-1.12-.29-1.517a3.1 3.1 0 0 0-.721-1.107 3.1 3.1 0 0 0-1.107-.72c-.398-.155-.852-.261-1.517-.291-.667-.03-.88-.038-2.577-.038m0 1.126c1.669 0 1.867.006 2.525.037.61.027.94.13 1.161.215.292.113.5.249.719.467s.354.427.467.719c.086.22.188.551.215 1.16.03.66.037.857.037 2.526s-.006 1.867-.037 2.525c-.027.61-.13.94-.215 1.161-.113.292-.249.5-.467.719a1.9 1.9 0 0 1-.719.467c-.22.086-.551.188-1.16.215-.66.03-.857.037-2.526.037s-1.867-.006-2.526-.037c-.609-.027-.94-.13-1.16-.215a1.9 1.9 0 0 1-.719-.467 1.9 1.9 0 0 1-.467-.719c-.086-.22-.188-.551-.215-1.16-.03-.66-.037-.857-.037-2.526s.006-1.867.037-2.526c.027-.609.13-.94.215-1.16.113-.292.249-.5.467-.719s.427-.354.719-.467c.22-.086.551-.188 1.16-.215.66-.03.857-.037 2.526-.037m0 1.915a3.21 3.21 0 1 0 0 6.419 3.21 3.21 0 0 0 0-6.42m0 5.292a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166m4.086-5.42a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" clip-rule="evenodd"></path>
                <path fill="currentColor" fill-rule="evenodd" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m0 3.75c-1.697 0-1.91.007-2.577.038-.665.03-1.12.136-1.517.29-.411.16-.76.374-1.107.721a3.1 3.1 0 0 0-.72 1.107c-.155.398-.261.852-.291 1.517-.03.667-.038.88-.038 2.577s.007 1.91.038 2.577c.03.665.136 1.12.29 1.517.16.411.374.76.721 1.107.347.348.696.561 1.107.72.398.155.852.261 1.517.291.667.03.88.038 2.577.038s1.91-.007 2.577-.038c.665-.03 1.12-.136 1.517-.29.411-.16.76-.373 1.107-.721.348-.348.561-.696.72-1.107.155-.398.261-.852.291-1.517.03-.667.038-.88.038-2.577s-.007-1.91-.038-2.577c-.03-.665-.136-1.12-.29-1.517a3.1 3.1 0 0 0-.721-1.107 3.1 3.1 0 0 0-1.107-.72c-.398-.155-.852-.261-1.517-.291-.667-.03-.88-.038-2.577-.038m0 1.126c1.669 0 1.867.006 2.525.037.61.027.94.13 1.161.215.292.113.5.249.719.467s.354.427.467.719c.086.22.188.551.215 1.16.03.66.037.857.037 2.526s-.006 1.867-.037 2.525c-.027.61-.13.94-.215 1.161-.113.292-.249.5-.467.719a1.9 1.9 0 0 1-.719.467c-.22.086-.551.188-1.16.215-.66.03-.857.037-2.526.037s-1.867-.006-2.526-.037c-.609-.027-.94-.13-1.16-.215a1.9 1.9 0 0 1-.719-.467 1.9 1.9 0 0 1-.467-.719c-.086-.22-.188-.551-.215-1.16-.03-.66-.037-.857-.037-2.526s.006-1.867.037-2.526c.027-.609.13-.94.215-1.16.113-.292.249-.5.467-.719s.427-.354.719-.467c.22-.086.551-.188 1.16-.215.66-.03.857-.037 2.526-.037m0 1.915a3.21 3.21 0 1 0 0 6.419 3.21 3.21 0 0 0 0-6.42m0 5.292a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166m4.086-5.42a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" clip-rule="evenodd"></path>
              </svg>
            </a>
            <Button href="#contacto" variant="primary">Contacto</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-[#3a693a] p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section id="inicio" className="relative py-10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ">
          <h1 className="text-5xl/17 md:text-6xl/17 font-semibold font-playfair-display leading-tight mb-8 max-w-4xl text-[#0a0909]">
            Artículos <br></br> personalizados para <br></br> cada momento
          </h1>
          <p className="text-lg text-gray-700 max-w-5xl mb-12 font-mulish font-medium leading-relaxed">
            Todo tipo de artículos personalizados hechos a mano, detalles para bodas, bautizos, comuniones, cumpleaños, etc. Cuando se hace con amor... sale mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#contacto" variant="primary">Pedir presupuesto</Button>
            <Button href="#servicios" variant="secondary">Ver servicios</Button>
          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION */}
      <section id="galeria" className='mb-18'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-xs text-[#0a0909] font-mulish">___ Nuestros productos</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((src, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-[#3a693a]/10 group">
                <img
                  src={src}
                  alt={`Trabajo personalizado ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="servicios" className="py-18 border-y border-[#3a693a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-xs text-[#0a0909] font-mulish">___ Nuestros servicios</span>
          </div>
          <div className='text-center'>
           <p className="text-lg text-gray-700 max-w-5xl mb-12 font-mulish font-medium leading-relaxed">Ofrecemos tecnología de vanguardia para garantizar acabados impecables en cada proyecto.</p>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard
              iconType="laser"
              title="Grabado Láser"
              description="Precisión absoluta en madera, cristal, cuero y metal para un acabado elegante, permanente y de alta definición."
            />
            <ServiceCard
              iconType="uv"
              title="Impresión UV"
              description="Colores vibrantes y alta resolución directamente sobre superficies rígidas. Ideal para personalizar carcasas, placas y trofeos."
            />
            <ServiceCard
              iconType="sublimation"
              title="Sublimación"
              description="Perfecto para textiles, tazas y artículos promocionales. La tinta se funde con el material garantizando durabilidad extrema."
            />
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="nosotros" className="py-18 border-y border-[#3a693a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-xs text-[#0a0909] font-mulish">___ Sobre nosotros</span>
          </div>
          <div>
            <p className="text-xl text-gray-800 leading-relaxed font-medium bg-white p-10 rounded-2xl shadow-sm border border-[#3a693a]/10">
              En <strong className="text-[#3a693a]">Las Cosas de Mina</strong> nos apasiona el detalle. Llevamos años dedicados a dar vida a tus proyectos,
              ya sea un regalo especial para un ser querido o la decoración perfecta para tu gran evento.
              Cuidamos cada producto como si fuera el único, garantizando la máxima calidad en cada entrega.
              Cada pieza es hecha a mano en Hinojosa del Duque (Córdoba) con atención al detalle.
              <div className="group w-60 h-60 grid justify-items-center m-auto mt-4">
                <img
                  src="mina_miriam.jpg"
                  alt={`Sobre nosotros`}
                  className='rounded-full shadow-sm border border-[#3a693a]/10'
                />
                <div>
                  <span className='font-semibold font-mulish'>Miriam Navas</span>
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contacto" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-[#3a693a] tracking-tight mb-5">¿Hablamos?</h2>
            <p className="text-lg text-gray-700">Cuéntanos tu idea y te haremos un presupuesto a medida sin compromiso.</p>
          </div>
         
          <form className="space-y-8 bg-white p-10 md:p-12 rounded-3xl shadow-md border border-[#3a693a]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#3a693a] mb-2">Nombre Completo</label>
                <input type="text" id="name" name="name" required placeholder="Juan Pérez" className="w-full px-5 py-3.5 bg-[#f8edf0]/50 border border-[#3a693a]/20 rounded-lg focus:ring-2 focus:ring-[#3a693a] focus:border-[#3a693a] outline-none transition-all placeholder:text-gray-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#3a693a] mb-2">Correo Electrónico</label>
                <input type="email" id="email" name="email" required placeholder="juan@email.com" className="w-full px-5 py-3.5 bg-[#f8edf0]/50 border border-[#3a693a]/20 rounded-lg focus:ring-2 focus:ring-[#3a693a] focus:border-[#3a693a] outline-none transition-all placeholder:text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-[#3a693a] mb-2">¿Qué necesitas personalizar?</label>
              <textarea id="message" name="message" rows={6} required placeholder="Describe tu idea, cantidad, material..." className="w-full px-5 py-3.5 bg-[#f8edf0]/50 border border-[#3a693a]/20 rounded-lg focus:ring-2 focus:ring-[#3a693a] focus:border-[#3a693a] outline-none transition-all resize-y placeholder:text-gray-400"></textarea>
            </div>
            <div className="text-center">
              <Button type="submit" variant="primary" className="w-full md:w-auto md:px-12">Enviar Solicitud</Button>
            </div>
          </form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#3a693a] py-16 text-[#f8edf0]/80 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-extrabold text-[#f8edf0] mb-4">Las Cosas de Mina</span>
            <p className="text-sm">Calidad y pasión en cada personalización.</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-[#f8edf0] mb-4">Enlaces Rápidos</h4>
            <div className="flex gap-4 text-sm">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-bold text-[#f8edf0] mb-4">Contacto</h4>
            <p className="text-sm">lascosasdemina@gmail.com</p>
            <p className="text-sm">+34 600 085 929</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#f8edf0]/20 text-center text-xs text-[#f8edf0]/60">
          <p>&copy; {new Date().getFullYear()} Las Cosas de Mina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
