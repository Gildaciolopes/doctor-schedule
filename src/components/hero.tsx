import { ArrowRight, CheckCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

import NextAppointmentsCard from "./next-appointments-card";

const Hero = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="px-6 pt-24 pb-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl leading-tight font-bold md:text-6xl">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Revolucione
                </span>
                <br />
                <span className="text-primary dark:text-white">
                  seus agendamentos médicos
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                Simplifique a gestão de consultas com nossa plataforma
                intuitiva. Mais tempo para cuidar dos pacientes, menos tempo com
                papelada.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/authentication">
                <button className="group flex transform items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl">
                  <span>{`${session ? "Dashboard" : "Login"}`}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="dark:hover:text-primary rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:cursor-pointer hover:border-blue-600 hover:text-blue-600 dark:border-gray-300 dark:text-gray-300 dark:hover:border-white">
                Ver Demonstração
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 dark:text-white">
                  Grátis por 30 dias
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 dark:text-white">
                  Controle de Agendamentos
                </span>
              </div>
            </div>
          </div>

          <NextAppointmentsCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
