import { CheckCircle } from "lucide-react";

const stats = [
  { stat: "80%", label: "Redução no tempo de agendamento" },
  { stat: "65%", label: "Menos faltas nas consultas" },
  { stat: "90%", label: "Satisfação dos pacientes" },
  { stat: "50%", label: "Economia em recursos administrativos" },
];

const benefitCards = [
  "Agenda sempre organizada",
  "Pacientes mais satisfeitos",
  "Menos trabalho manual",
  "Mais tempo para cuidar",
];

const Benefits = () => {
  return (
    <section id="beneficios" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Large glass container */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/55 p-10 backdrop-blur-xl md:p-14 dark:border-white/8 dark:bg-white/4">
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            {/* Stats side */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Resultados comprovados
                </span>
              </div>
              <h2 className="mb-10 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                Transforme sua clínica em uma{" "}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  máquina eficiente
                </span>
              </h2>

              <div className="space-y-6">
                {stats.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-5xl font-bold text-transparent">
                      {benefit.stat}
                    </span>
                    <span className="text-sm leading-snug text-slate-600 dark:text-slate-300">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefit cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {benefitCards.map((benefit, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg dark:border-white/8 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
