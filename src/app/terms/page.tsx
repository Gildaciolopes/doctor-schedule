import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Termos de Serviço</h1>
      <ol className="list-decimal space-y-8 pl-6">
        <li>
          <strong className="text-primary">Termos</strong>
          <p>
            Ao acessar ao site Dr Schedule, concorda em cumprir estes termos de
            serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é
            responsável pelo cumprimento de todas as leis locais aplicáveis. Se
            você não concordar com algum desses termos, está proibido de usar ou
            acessar este site. Os materiais contidos neste site são protegidos
            pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>
        </li>
        <li>
          <strong className="text-primary">Uso de Licença</strong>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos
            materiais (informações ou software) no site Dr Schedule , apenas
            para visualização transitória pessoal e não comercial. Esta é a
            concessão de uma licença, não uma transferência de título e, sob
            esta licença, você não pode:
          </p>
          <ul className="list-disc pl-6">
            <li>modificar ou copiar os materiais;</li>
            <li>
              usar os materiais para qualquer finalidade comercial ou para
              exibição pública (comercial ou não comercial);
            </li>
            <li>
              tentar descompilar ou fazer engenharia reversa de qualquer
              software contido no site Dr Schedule;
            </li>
            <li>
              remover quaisquer direitos autorais ou outras notações de
              propriedade dos materiais; ou
            </li>
            <li>
              transferir os materiais para outra pessoa ou &apos;espelhe&apos;
              os materiais em qualquer outro servidor.
            </li>
          </ul>
          <p>
            Esta licença será automaticamente rescindida se você violar alguma
            dessas restrições e poderá ser rescindida por Dr Schedule a qualquer
            momento. Ao encerrar a visualização desses materiais ou após o
            término desta licença, você deve apagar todos os materiais baixados
            em sua posse, seja em formato eletrónico ou impresso.
          </p>
        </li>
        <li>
          <strong className="text-primary">Isenção de responsabilidade</strong>
          <p>
            Os materiais no site da Dr Schedule são fornecidos &apos;como
            estão&apos;. Dr Schedule não oferece garantias, expressas ou
            implícitas, e, por este meio, isenta e nega todas as outras
            garantias, incluindo, sem limitação, garantias implícitas ou
            condições de comercialização, adequação a um fim específico ou não
            violação de propriedade intelectual ou outra violação de direitos.
          </p>
          <p>
            Além disso, o Dr Schedule não garante ou faz qualquer representação
            relativa à precisão, aos resultados prováveis ​​ou à confiabilidade
            do uso dos materiais em seu site ou de outra forma relacionado a
            esses materiais ou em sites vinculados a este site.
          </p>
        </li>
        <li>
          <strong className="text-primary">Limitações</strong>
          <p>
            Em nenhum caso o Dr Schedule ou seus fornecedores serão responsáveis
            ​​por quaisquer danos (incluindo, sem limitação, danos por perda de
            dados ou lucro ou devido a interrupção dos negócios) decorrentes do
            uso ou da incapacidade de usar os materiais em Dr Schedule, mesmo
            que Dr Schedule ou um representante autorizado da Dr Schedule tenha
            sido notificado oralmente ou por escrito da possibilidade de tais
            danos. Como algumas jurisdições não permitem limitações em garantias
            implícitas, ou limitações de responsabilidade por danos conseqüentes
            ou incidentais, essas limitações podem não se aplicar a você.
          </p>
        </li>
        <li>
          <strong className="text-primary">Precisão dos materiais</strong>
          <p>
            Os materiais exibidos no site da Dr Schedule podem incluir erros
            técnicos, tipográficos ou fotográficos. Dr Schedule não garante que
            qualquer material em seu site seja preciso, completo ou atual. Dr
            Schedule pode fazer alterações nos materiais contidos em seu site a
            qualquer momento, sem aviso prévio. No entanto, Dr Schedule não se
            compromete a atualizar os materiais.
          </p>
        </li>
        <li>
          <strong className="text-primary">Links</strong>
          <p>
            O Dr Schedule não analisou todos os sites vinculados ao seu site e
            não é responsável pelo conteúdo de nenhum site vinculado. A inclusão
            de qualquer link não implica endosso por Dr Schedule do site. O uso
            de qualquer site vinculado é por conta e risco do usuário.
          </p>
        </li>
        <li>
          <strong className="text-primary">Modificações</strong>
          <p>
            O Dr Schedule pode revisar estes termos de serviço do site a
            qualquer momento, sem aviso prévio. Ao usar este site, você concorda
            em ficar vinculado à versão atual desses termos de serviço.
          </p>
        </li>
        <li>
          <strong className="text-primary">Lei aplicável</strong>
          <p>
            Estes termos e condições são regidos e interpretados de acordo com
            as leis do Dr Schedule e você se submete irrevogavelmente à
            jurisdição exclusiva dos tribunais naquele estado ou localidade.
          </p>
        </li>
      </ol>
      <Link href="/">
        <Button className="mt-4 w-full hover:cursor-pointer">Home</Button>
      </Link>
    </div>
  );
}
