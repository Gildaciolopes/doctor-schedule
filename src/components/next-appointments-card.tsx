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

const NextAppointmentsCard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.clinic?.id) {
    return (
      <div className="relative">
        <div className="absolute inset-0 rotate-6 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
        <div className="dark:bg-card relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:cursor-pointer">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="dark:text-primary text-xl font-semibold text-gray-800">
                Próximas Consultas
              </h3>
              <Calendar className="text-primary h-6 w-6" />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Nenhuma consulta encontrada.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const now = new Date();

  const [appointments] = await Promise.all([
    db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.clinicId, session.user.clinic.id),
        gt(appointmentsTable.date, now),
      ),
      orderBy: (appointments, { asc }) => [asc(appointments.date)],
      limit: 5,
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return (
    <div className="relative">
      <div className="absolute inset-0 rotate-6 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
      <div className="dark:bg-card relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:cursor-pointer">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="dark:text-primary text-xl font-semibold text-gray-800">
              Próximas Consultas
            </h3>
            <Calendar className="text-primary h-6 w-6" />
          </div>

          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="dark:bg-background flex items-center space-x-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-blue-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                    {appointment.patient
                      ? appointment.patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      : ""}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {appointment.patient?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{`Dr. ${appointment.doctor?.name}`}</p>
                  </div>
                  <div className="text-primary font-semibold">
                    {dayjs(appointment.date)
                      .tz("America/Sao_Paulo")
                      .format("DD/MM/YYYY [às] HH:mm")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Nenhuma consulta futura encontrada.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextAppointmentsCard;
