"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Icons } from "@/components/Icons";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/fundamentos-matematicos", label: "Matemáticas" },
  { href: "/pytorch-fundamentals", label: "PyTorch" },
  { href: "/redes-neuronales", label: "Redes Neuronales" },
  { href: "/transformers", label: "Transformers" },
  { href: "/referencias", label: "Referencias" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav transition-all duration-300 ${isScrolled ? 'h-14 bg-[var(--primary)]/90 shadow-lg shadow-black/20' : 'h-16'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link href="/" className="nav-logo flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-br from-[var(--highlight)] to-[var(--highlight-secondary)] rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
            <Icons.Brain className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:inline font-bold tracking-tight text-[var(--text-primary)]">Fundamentos de IA</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 items-center h-full">
          {navItems.map((item) => (
            <li key={item.href} className="h-full">
              <Link 
                href={item.href} 
                className={`flex items-center h-full px-1 border-b-2 transition-all duration-300 text-sm font-semibold tracking-wide uppercase ${
                  pathname === item.href 
                    ? 'border-[var(--highlight)] text-[var(--highlight)]' 
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-[var(--text-primary)] p-2 active:scale-95 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--primary)]/95 backdrop-blur-2xl border-b border-[var(--border)] animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col py-4 px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-4 border-b border-white/5 font-bold transition-colors ${
                    pathname === item.href ? 'text-[var(--highlight)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                  <Icons.ChevronRight className="w-4 h-4 opacity-30" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
