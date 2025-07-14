"use client";

import { useState } from "react";

const ContactCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Pronto para transformar sua clínica?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
          Junte-se a mais de 1.000 médicos que já revolucionaram seus
          agendamentos
        </p>

        <div className="mx-auto max-w-md">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-full px-6 py-4 text-gray-900 placeholder-blue-100 ring-4 ring-white/30 focus:ring-white/40 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="transform rounded-full bg-white px-8 py-4 font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
            >
              {isSubmitted ? "Obrigado!" : "Começar Agora"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-blue-100">
          Teste grátis por 30 dias • Sem cartão de crédito • Cancele a qualquer
          momento
        </p>
      </div>
    </section>
  );
};

export default ContactCTA;
