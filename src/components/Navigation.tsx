"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/" className="nav-logo">
          🧠 AI Researcher
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
