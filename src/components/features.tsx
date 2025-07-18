import { Calendar, Clock, Phone, Shield, Star, Users } from "lucide-react";

const Features = () => {
  return (
    <section id="recursos" className="bg-background px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Recursos que fazem a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              diferença
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Descubra como nossa plataforma pode transformar a gestão da sua
            clínica médica
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Calendar,
              title: "Agendamento Inteligente",
              description:
                "Sistema automatizado que evita conflitos e otimiza sua agenda",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Clock,
              title: "Lembretes Automáticos",
              description:
                "Reduza faltas com notificações por SMS e e-mail personalizadas",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Users,
              title: "Gestão de Pacientes",
              description: "Histórico completo e prontuário digital integrado",
              color: "from-green-500 to-teal-500",
            },
            {
              icon: Shield,
              title: "Segurança Total",
              description:
                "Dados protegidos com criptografia de nível hospitalar",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Star,
              title: "Interface Intuitiva",
              description: "Design pensado para facilitar o dia a dia médico",
              color: "from-indigo-500 to-purple-500",
            },
            {
              icon: Phone,
              title: "Suporte 24/7",
              description: "Equipe especializada sempre pronta para ajudar",
              color: "from-pink-500 to-rose-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group dark:bg-card transform rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer hover:bg-white hover:shadow-lg dark:hover:bg-zinc-800"
            >
              <div
                className={`h-14 w-14 bg-gradient-to-r ${feature.color} mb-6 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="dark:text-primary mb-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
