import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dra. Izadora Alves",
    specialty: "Pediatra",
    initials: "I",
    text: "O Doctor Schedule revolucionou minha prática. Agora posso focar 100% nos meus pacientes.",
    rating: 5,
    gradient: "from-primary to-primary",
  },
  {
    name: "Dr. Bruno Gabriel",
    specialty: "Dermatologista",
    initials: "B",
    text: "Interface incrível e suporte excepcional. Recomendo para todos os colegas!",
    rating: 5,
    gradient: "from-primary to-primary",
  },
  {
    name: "Dr. Gildácio Lopes",
    specialty: "Clínico Geral",
    initials: "G",
    text: "Economizo 3 horas por dia em tarefas administrativas. Simplesmente fantástico!",
    rating: 5,
    gradient: "from-primary to-primary",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Depoimentos
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              médicos
            </span>{" "}
            dizem
          </h2>
        </div>

        {/* Glass testimonial cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/60 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl dark:border-white/8 dark:bg-white/5 dark:hover:bg-white/8"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white shadow-md`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {testimonial.specialty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
