import "dayjs/locale/pt-br";

import dayjs from "dayjs";

import { doctorsTable } from "@/db/schema";

dayjs.locale("pt-br");

export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
  const from = dayjs()
    .day(doctor.availableFromWeekDay)
    .set("hour", Number(doctor.availableFromTime.split(":")[0]))
    .set("minute", Number(doctor.availableFromTime.split(":")[1]))
    .set("second", Number(doctor.availableFromTime.split(":")[2] || 0));
  const to = dayjs()
    .day(doctor.availableToWeekDay)
    .set("hour", Number(doctor.availableToTime.split(":")[0]))
    .set("minute", Number(doctor.availableToTime.split(":")[1]))
    .set("second", Number(doctor.availableToTime.split(":")[2] || 0));
  return { from, to };
};
