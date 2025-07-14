import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section id="depoimentos" className="bg-white px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              médicos
            </span>{" "}
            dizem
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Dra. Vitória Alves",
              specialty: "Psicóloga",
              text: "O Doctor Schedule revolucionou minha prática. Agora posso focar 100% nos meus pacientes.",
              rating: 5,
            },
            {
              name: "Dr. Bruno Gabriel",
              specialty: "Dermatologista",
              text: "Interface incrível e suporte excepcional. Recomendo para todos os colegas!",
              rating: 5,
            },
            {
              name: "Dr. Gildácio Lopes",
              specialty: "Clínico Geral",
              text: "Economizo 3 horas por dia em tarefas administrativas. Simplesmente fantástico!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
            >
              <div className="mb-4 flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-6 text-gray-700 italic">{testimonial.text}</p>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-gray-600">{testimonial.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
