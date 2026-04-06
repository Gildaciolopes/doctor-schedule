"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ContactCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section id="contato" className="px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        {/* Glass CTA box with gradient fill */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700 p-12 text-center shadow-2xl shadow-blue-500/30 md:p-16">
          {/* Frosted glass layer */}
          <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

          {/* Decorative orbs inside CTA */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-purple-300/25 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 -top-10 h-40 w-80 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />

          {/* Border highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20" />

          {/* Content */}
          <div className="relative">
            <div className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-100">
                Comece hoje mesmo
              </span>
            </div>

            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Pronto para transformar
              <br />
              sua clínica?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base text-blue-100/80">
              Junte-se a mais de 1.000 médicos que já revolucionaram seus
              agendamentos
            </p>

            {/* Email capture */}
            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-blue-200/60 backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/15 focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-px hover:cursor-pointer hover:shadow-xl"
                >
                  {isSubmitted ? (
                    "Obrigado!"
                  ) : (
                    <>
                      Começar Agora
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-6 text-xs text-blue-200/60">
              Teste grátis por 30 dias · Controle de Agendamentos · Cancele a
              qualquer momento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
