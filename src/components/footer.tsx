import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 px-6 py-16 dark:border-white/8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Doctor Schedule"
                width={136}
                height={28}
                className="block dark:hidden"
              />
              <Image
                src="/logo-dark.svg"
                alt="Doctor Schedule"
                width={136}
                height={28}
                className="hidden dark:block"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 dark:text-slate-500">
              Revolucionando a gestão médica com tecnologia de ponta.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-700 dark:text-white">
              Produto
            </h4>
            <div className="space-y-2.5">
              {["Recursos", "Preços", "Segurança"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-700 dark:text-white">
              Suporte
            </h4>
            <div className="space-y-2.5">
              <a
                href="#"
                className="block text-sm text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
              >
                Central de Ajuda
              </a>
              <a
                href="/privacy"
                className="block text-sm text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
              >
                Política de Privacidade
              </a>
              <a
                href="/terms"
                className="block text-sm text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
              >
                Termos de Uso
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-700 dark:text-white">
              Contato
            </h4>
            <div className="space-y-3">
              {[
                { icon: Phone, label: "(11) 9999-9999" },
                { icon: Mail, label: "contato@schedule.com" },
                { icon: MapPin, label: "São Paulo, SP" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-400 dark:border-white/8 dark:text-slate-500 sm:flex-row">
          <p>&copy; {currentYear} Dr Schedule. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://gildacio.com"
              target="_blank"
              className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
            >
              Gildácio Lopes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
