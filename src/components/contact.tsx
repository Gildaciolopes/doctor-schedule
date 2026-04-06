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
      <div className="container mx-auto max-w-6xl">
        {/* Glass CTA box with gradient fill */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200/80 p-12 text-center shadow-2xl md:p-16 dark:border-white/10">
          {/* Frosted glass layer */}
          <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

          {/* Content */}
          <div className="relative">
            <div className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-white/10 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <span className="text-xs font-semibold text-slate-600 dark:text-white">
                Comece hoje mesmo
              </span>
            </div>

            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
              Pronto para transformar
              <br />
              sua clínica?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base text-slate-600 dark:text-slate-300">
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
                  className="flex-1 rounded-xl border border-slate-200 bg-white/10 px-5 py-3 text-sm text-slate-900 backdrop-blur-sm transition-colors placeholder:text-slate-400 focus:border-slate-300 focus:bg-white/15 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-white/20 dark:focus:bg-white/10"
                />
                <button
                  onClick={handleSubmit}
                  className="text-primary flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-px hover:cursor-pointer dark:text-black"
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

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
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
