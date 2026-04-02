/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Hammer, 
  Home, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  Trees, 
  Wind, 
  Layout, 
  Maximize,
  Menu,
  X,
  Linkedin
} from "lucide-react";
import { useState, FormEvent } from "react";

const services = [
  {
    title: "Charpente & Ossature",
    icon: <Hammer className="w-6 h-6" />,
    items: ["Traditionnelle", "Industrielle (Fermette)", "Ossature bois", "Extension", "Modification de charpente"]
  },
  {
    title: "Couverture & Bardage",
    icon: <Home className="w-6 h-6" />,
    items: ["Couverture", "Pose de Velux", "Bardage bois", "Caches moineaux"]
  },
  {
    title: "Aménagement Extérieur",
    icon: <Trees className="w-6 h-6" />,
    items: ["Terrasses bois", "Store banne", "Pergolas", "Cabanes de jardin"]
  },
  {
    title: "Aménagement Intérieur",
    icon: <Layout className="w-6 h-6" />,
    items: ["Isolation & Placo", "Cuisines & Salles de bain", "Escaliers", "Dressing & Parquet", "Menuiserie"]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Charpente / Couverture",
    message: ""
  });

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande de devis - ${formData.projectType}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Type de projet: ${formData.projectType}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:achabitat76@gmail.com?subject=${subject}&body=${body}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              src={selectedImage}
              alt="Réalisation agrandie"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-14 h-14 overflow-hidden">
                <img 
                  src="https://image.noelshack.com/fichiers/2026/14/4/1775082023-heri-5.jpg" 
                  alt="Logo AC-Habitat 76" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-wood-900">
                AC-Habitat <span className="text-wood-600">76</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Réalisations', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-wood-700 hover:text-wood-900 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <a 
                href="https://wa.me/33763990789?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20vos%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-wood-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-wood-800 transition-all shadow-lg shadow-wood-200"
              >
                Devis gratuit
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-wood-900">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-wood-200 px-4 py-6 flex flex-col gap-4"
          >
            {['Services', 'Réalisations', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-lg font-medium text-wood-700 py-2"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-44.jpg" 
            alt="Magnificent wood background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-12 relative flex justify-center lg:justify-start"
              >
                {/* Rotating Wood-like SVG Design */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[20px] opacity-40"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-wood-500">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                  </svg>
                </motion.div>
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[15px] opacity-20"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-wood-400">
                    <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="5 10" />
                    <path d="M50 2 A48 48 0 0 1 98 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M50 98 A48 48 0 0 1 2 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </motion.div>
                
                <div className="relative z-10">
                  <img 
                    src="https://image.noelshack.com/fichiers/2026/14/4/1775082023-heri-5.jpg" 
                    alt="Logo AC-Habitat 76" 
                    className="w-80 h-80 md:w-64 md:h-64 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-lg mx-auto lg:mx-0">
                <MapPin className="w-4 h-4 text-wood-300" />
                Basé en Normandie à Octeville-sur-Mer
              </div>
              <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                L'Art du Bois au Service de votre <span className="text-wood-400 italic">Habitat</span>
              </h1>
              <p className="text-xl text-wood-100 mb-12 max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mx-auto lg:mx-0">
                Spécialiste en charpente, couverture et aménagements bois. Nous intervenons sur toute la Normandie pour vos projets de construction et rénovation.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/33763990789?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20vos%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-wood-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-wood-600 transition-all shadow-2xl shadow-wood-900/50 flex items-center gap-3 group"
                >
                  Demander un devis <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
                >
                  Nos services
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-white/10 backdrop-blur-sm">
                <img 
                  src="https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-46.jpg" 
                  alt="Charpente bois magnifique" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-wood-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-wood-400/10 rounded-full blur-3xl animate-pulse delay-700" />
              
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[32px] shadow-2xl z-20 border border-wood-100">
                <div className="text-5xl font-serif font-bold text-wood-900 mb-2">100%</div>
                <div className="text-wood-600 text-sm uppercase tracking-[0.2em] font-black">Savoir-faire Normand</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-wood-50 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-wood-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Expertise Artisanale</span>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-wood-900 mb-8">Nos Domaines d'Expertise</h2>
            <div className="h-2 w-32 bg-wood-600 mx-auto rounded-full mb-10 shadow-sm" />
            <p className="text-xl text-wood-700 leading-relaxed">
              De la charpente traditionnelle à l'aménagement intérieur, nous vous accompagnons dans chaque étape de votre projet avec la passion du bois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="wood-card p-10 group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-wood-100 rounded-3xl flex items-center justify-center text-wood-700 mb-8 shadow-inner group-hover:bg-wood-700 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-wood-900 mb-6">{service.title}</h3>
                <ul className="space-y-4">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-wood-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-wood-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Realisations / Gallery */}
      <section id="réalisations" className="py-32 bg-wood-100/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-wood-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Portfolio</span>
              <h2 className="text-5xl font-serif font-bold text-wood-900 mb-6">Nos Réalisations</h2>
              <p className="text-xl text-wood-700">Découvrez quelques-uns de nos projets récents en Normandie, où chaque détail compte.</p>
            </div>
            <button className="bg-white text-wood-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-wood-200 transition-all shadow-lg border border-wood-200">
              Voir tout le portfolio <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-44.jpg")}
              className="md:col-span-2 aspect-video rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-44.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-45.jpg")}
              className="aspect-square rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-45.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-47.jpg")}
              className="aspect-square rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775060810-photo-2026-04-01-18-16-47.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-49.jpg")}
              className="md:col-span-2 aspect-video rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-49.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-48.jpg")}
              className="aspect-square rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062057-photo-2026-04-01-18-16-48.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062270-photo-2026-04-01-18-16-43-2.jpg")}
              className="md:col-span-2 aspect-video rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062270-photo-2026-04-01-18-16-43-2.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062271-photo-2026-04-01-18-16-43.jpg")}
              className="aspect-square rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062271-photo-2026-04-01-18-16-43.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062270-photo-2026-04-01-18-16-42.jpg")}
              className="md:col-span-2 aspect-video rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062270-photo-2026-04-01-18-16-42.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage("https://image.noelshack.com/fichiers/2026/14/3/1775062271-photo-2026-04-01-18-16-41.jpg")}
              className="aspect-square rounded-[32px] overflow-hidden shadow-2xl group relative cursor-zoom-in"
            >
              <img 
                src="https://image.noelshack.com/fichiers/2026/14/3/1775062271-photo-2026-04-01-18-16-41.jpg" 
                alt="Réalisation AC-Habitat 76" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-wood-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-wood-800/50 skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Parlons de votre <span className="text-wood-400">Projet</span></h2>
              <p className="text-wood-200 text-lg mb-12 max-w-md">
                Besoin d'un conseil ou d'un devis ? Thibault Desurosne et son équipe sont à votre écoute pour concrétiser vos envies.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-wood-800 rounded-2xl flex items-center justify-center text-wood-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-wood-400 text-sm font-bold uppercase tracking-wider mb-1">Téléphone</div>
                    <a href="tel:0763990789" className="text-2xl font-bold hover:text-wood-400 transition-colors">07 63 99 07 89</a>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-wood-800 rounded-2xl flex items-center justify-center text-wood-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-wood-400 text-sm font-bold uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:achabitat76@gmail.com" className="text-lg font-bold hover:text-wood-400 transition-colors">achabitat76@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-wood-800 rounded-2xl flex items-center justify-center text-wood-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-wood-400 text-sm font-bold uppercase tracking-wider mb-1">Adresse</div>
                    <div className="text-xl font-bold">7 rue des hautes vallées, 76930 Octeville-sur-Mer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-12 rounded-3xl text-wood-900 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold mb-8">Envoyez-nous un message</h3>
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-wood-600 mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-wood-200 focus:border-wood-600 focus:ring-2 focus:ring-wood-100 outline-none transition-all" 
                      placeholder="Jean Dupont" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-wood-600 mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-wood-200 focus:border-wood-600 focus:ring-2 focus:ring-wood-100 outline-none transition-all" 
                      placeholder="jean@exemple.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-wood-600 mb-2">Type de projet</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-wood-200 focus:border-wood-600 focus:ring-2 focus:ring-wood-100 outline-none transition-all bg-white"
                  >
                    <option>Charpente / Couverture</option>
                    <option>Aménagement Extérieur</option>
                    <option>Aménagement Intérieur</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-wood-600 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-wood-200 focus:border-wood-600 focus:ring-2 focus:ring-wood-100 outline-none transition-all" 
                    placeholder="Décrivez votre projet..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-wood-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-wood-800 transition-all shadow-lg mb-8"
                >
                  Envoyer ma demande
                </button>

                <div className="flex flex-col items-center gap-3 pt-6 border-t border-wood-100">
                  <span className="text-wood-600 font-bold text-sm uppercase tracking-wider">Nous suivre</span>
                  <a 
                    href="https://fr.linkedin.com/in/thibault-desurosne-696899103" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-wood-50 rounded-full shadow-sm border border-wood-200 text-wood-700 hover:text-wood-900 hover:scale-110 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-wood-50 border-t border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden">
                <img 
                  src="https://image.noelshack.com/fichiers/2026/14/4/1775082023-heri-5.jpg" 
                  alt="Logo AC-Habitat 76" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-wood-900">
                AC-Habitat <span className="text-wood-600">76</span>
              </span>
            </div>
            
            <div className="text-wood-500 text-sm">
              © {new Date().getFullYear()} AC-Habitat 76. Tous droits réservés.
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
