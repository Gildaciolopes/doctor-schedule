import { Calendar, Clock, Phone, Shield, Star, Users } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description:
      "Sistema automatizado que evita conflitos e otimiza sua agenda com IA",
    gradient: "from-primary to-primary",
    shadow: "shadow-blue-500/25",
  },
  {
    icon: Clock,
    title: "Lembretes Automáticos",
    description:
      "Reduza faltas com notificações por SMS e e-mail personalizadas",
    gradient: "from-primary to-primary",
    shadow: "shadow-violet-500/25",
  },
  {
    icon: Users,
    title: "Gestão de Pacientes",
    description: "Histórico completo e prontuário digital integrado",
    gradient: "from-primary to-primary",
    shadow: "shadow-emerald-500/25",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Dados protegidos com criptografia de nível hospitalar",
    gradient: "from-primary to-primary",
    shadow: "shadow-orange-500/25",
  },
  {
    icon: Star,
    title: "Interface Intuitiva",
    description: "Design pensado para facilitar o dia a dia médico",
    gradient: "from-primary to-primary",
    shadow: "shadow-indigo-500/25",
  },
  {
    icon: Phone,
    title: "Suporte 24/7",
    description: "Equipe especializada sempre pronta para ajudar",
    gradient: "from-primary to-primary",
    shadow: "shadow-pink-500/25",
  },
];

const Features = () => {
  return (
    <section id="recursos" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Funcionalidades
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Recursos que fazem a <span className="text-primary">diferença</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Descubra como nossa plataforma pode transformar a gestão da sua
            clínica médica
          </p>
        </div>

        {/* Glass cards grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:border-slate-300/80 hover:bg-white/80 hover:shadow-xl dark:border-white/8 dark:bg-white/4 dark:hover:border-white/15 dark:hover:bg-white/8"
            >
              {/* Hover accent glow */}
              <div
                className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15`}
              />

              {/* Icon – glassmorphism frame */}
              <div className="relative mb-5 inline-flex">
                {/* Colored glow behind the glass */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-25 blur-xl`}
                />
                {/* Frosted glass frame */}
                <div className="relative flex h-15 w-15 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-white/8">
                  {/* Gradient icon box inside */}
                  <div
                    className={`flex items-center justify-center rounded-xl`}
                  >
                    <feature.icon className="text-primary h-8 w-8" />
                  </div>
                </div>
              </div>

              <h3 className="relative mb-2.5 text-base font-semibold text-slate-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
