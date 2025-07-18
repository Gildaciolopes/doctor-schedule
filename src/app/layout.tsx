import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Doctor Schedule - Sistema de Agendamento",
    template: "Doctor Schecule - %s",
  },
  description: "Gerencie as consultas da sua clínica de forma ágil",
  icons: { icon: "/favicon.ico" },
  keywords: [
    "agendamento de consultas",
    "gestão de clínic",
    "controle de agenda de médicos e pacientes",
    "saas",
    "software como serviço",
    "plataforma online",
    "gestão de consultório",
    "gestão de clínica",
    "agenda médica",
    "sistema médico",
    "consultório digital",
    "médicos",
    "pacientes",
    "agendamento online",
    "controle de consultas",
    "faturamento médico",
    "assinatura",
    "plano de assinatura",
    "gestão de pacientes",
    "gestão de médicos",
    "clínica médica",
    "consultório",
    "tecnologia em saúde",
    "healthtech",
    "produtividade médica",
    "organização de agenda",
    "confirmação de consulta",
    "notificações de consulta",
    "suporte ao paciente",
    "dashboard médico",
    "relatórios médicos",
    "segurança de dados",
    "LGPD",
    "prontuário eletrônico",
  ],
  authors: [
    { name: "Gildácio Lopes", url: "https://gildaciolopes.netlify.app" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ReactQueryProvider>
          <Toaster richColors position="bottom-center" theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
