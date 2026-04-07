import { ArrowRight, CheckCircle, Trophy } from "lucide-react";
import Link from "next/link";

import { getSession } from "@/lib/get-session";

import NextAppointmentsCard from "./next-appointments-card";

const Hero = async () => {
  const session = await getSession();

  return (
    <section className="relative px-6 pt-40 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center lg:justify-start">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3.5 py-1.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:cursor-pointer hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
            <Trophy className="h-3.5 w-3.5 text-black dark:text-white" />
            <span className="text-xs font-semibold text-black dark:text-white">
              Plataforma #1 em Agendamento Médico
            </span>
          </div>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left – copy */}
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="text-5xl leading-[1.08] font-bold tracking-tight md:text-6xl lg:text-[4.25rem]">
                <span className="block bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Revolucione
                </span>
                <span className="block text-slate-900 dark:text-white">
                  seus agendamentos
                </span>
                <span className="block text-slate-900 dark:text-white">
                  médicos
                </span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                Simplifique a gestão de consultas com nossa plataforma
                intuitiva. Mais tempo para cuidar dos pacientes, menos tempo com
                papelada.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/authentication">
                <button className="group flex items-center gap-2.5 rounded-xl bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:cursor-pointer dark:bg-white dark:text-black">
                  <span>{session ? "Ir ao Dashboard" : "Começar Grátis"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/authentication?demo=true">
                <button className="rounded-xl border border-slate-200 bg-white/60 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:cursor-pointer hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  Ver Demonstração
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {[
                "Grátis por 30 dias",
                "Controle de Agendamentos",
                "Cancele quando quiser",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – glass appointments card */}
          <div className="relative">
            <NextAppointmentsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
