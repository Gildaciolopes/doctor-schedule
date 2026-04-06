import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { and, eq, gt } from "drizzle-orm";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentRow = ({
  name,
  doctor,
  date,
}: {
  name: string;
  doctor: string;
  date: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-white/60 p-3 transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-black/5 dark:hover:bg-black/10">
      <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
          {name}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Dr. {doctor}
        </p>
      </div>
      <span className="text-primary shrink-0 text-xs font-medium">{date}</span>
    </div>
  );
};

const NextAppointmentsCard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let appointmentsContent = (
    <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">
      Nenhuma consulta encontrada.
    </p>
  );

  if (session?.user?.clinic?.id) {
    const now = new Date();
    const appointments = await db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.clinicId, session.user.clinic.id),
        gt(appointmentsTable.date, now),
      ),
      orderBy: (appointments, { asc }) => [asc(appointments.date)],
      limit: 5,
      with: { patient: true, doctor: true },
    });

    if (appointments.length > 0) {
      appointmentsContent = (
        <div className="space-y-2">
          {appointments.map((appointment, index) => (
            <AppointmentRow
              key={index}
              name={appointment.patient?.name ?? ""}
              doctor={appointment.doctor?.name ?? ""}
              date={dayjs(appointment.date)
                .tz("America/Sao_Paulo")
                .format("DD/MM [às] HH:mm")}
            />
          ))}
        </div>
      );
    }
  }

  return (
    <div className="relative">
      {/* Main glass card */}
      <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-2xl shadow-slate-200/60 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-black/50">
        <div className="space-y-5">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                Próximas Consultas
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Hoje e próximos dias
              </p>
            </div>
            <div className="border-slate-10 flex h-10 w-10 items-center justify-center rounded-xl border">
              <Calendar className="text-primary h-5 w-5" />
            </div>
          </div>

          {appointmentsContent}
        </div>
      </div>
    </div>
  );
};

export default NextAppointmentsCard;
