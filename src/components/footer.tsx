import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contato" className="bg-background px-6 py-16 text-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
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
            <p className="pt-3 text-gray-400">
              Revolucionando a gestão médica com tecnologia de ponta.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold dark:text-white">Produto</h4>
            <div className="space-y-2 text-gray-400">
              <a
                href="#"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Recursos
              </a>
              <a
                href="#"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Preços
              </a>
              <a
                href="#"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Segurança
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold dark:text-white">Suporte</h4>
            <div className="space-y-2 text-gray-400">
              <a
                href="#"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Central de Ajuda
              </a>
              <a
                href="/privacy"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Política de Privacidade
              </a>
              <a
                href="/terms"
                className="dark:hover:text-primary block transition-colors hover:text-blue-500"
              >
                Termos de Uso
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold dark:text-white">Contato</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@schedule.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400 dark:border-gray-400">
          <p>
            &copy; {currentYear} Dr Schedule. Desenvolvido por
            <span className="text-primary font-semibold">
              <a href="https://gildaciolopes.netlify.app" target="_blank">
                {" "}
                Gildácio Lopes
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
