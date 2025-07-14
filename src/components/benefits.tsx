import { CheckCircle } from "lucide-react";

const Benefits = () => {
  return (
    <section
      id="beneficios"
      className="bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
              Transforme sua clínica em uma
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                máquina eficiente
              </span>
            </h2>

            <div className="space-y-6">
              {[
                { stat: "80%", label: "Redução no tempo de agendamento" },
                { stat: "65%", label: "Menos faltas nas consultas" },
                { stat: "90%", label: "Satisfação dos pacientes" },
                {
                  stat: "50%",
                  label: "Economia em recursos administrativos",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                    {benefit.stat}
                  </div>
                  <div className="text-lg text-gray-700">{benefit.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              "Agenda sempre organizada",
              "Pacientes mais satisfeitos",
              "Menos trabalho manual",
              "Mais tempo para cuidar",
            ].map((benefit, index) => (
              <div
                key={index}
                className="transform rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl"
              >
                <CheckCircle className="mb-4 h-8 w-8 text-green-500" />
                <p className="font-semibold text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
