"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { href: "#recursos", label: "Recursos" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4">
      {/* Glass nav pill */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/75 shadow-lg shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
        <nav className="flex items-center justify-between px-6 py-3">
          <Link href="/">
            <Image
              className="block dark:hidden"
              src="/logo.svg"
              alt="Logo"
              width={140}
              height={34}
              priority
            />
            <Image
              className="hidden dark:block"
              src="/logo-dark.svg"
              alt="Logo"
              width={140}
              height={34}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {label}
              </a>
            ))}
            <Link href="/authentication">
              <button className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:-translate-y-px hover:cursor-pointer hover:shadow-lg hover:shadow-blue-500/40">
                Começar Agora
              </button>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-2 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 md:hidden">
          <div className="space-y-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <div className="pt-2">
              <Link href="/authentication">
                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white">
                  Começar Agora
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
