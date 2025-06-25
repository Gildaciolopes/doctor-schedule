"use server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { generateTimeSlots } from "@/helpers/time";
import { protectedWithClinicActionClient } from "@/lib/next-safe-action";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAvailableTimes = protectedWithClinicActionClient
  .schema(
    z.object({
      doctorId: z.string(),
      date: z.string().date(), // YYYY-MM-DD,
    }),
  )
  .action(async ({ parsedInput }) => {
    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.doctorId),
    });
    if (!doctor) {
      throw new Error("Médico não encontrado");
    }
    const selectedDayOfWeek = dayjs(parsedInput.date).day();
    const doctorIsAvailable =
      selectedDayOfWeek >= doctor.availableFromWeekDay &&
      selectedDayOfWeek <= doctor.availableToWeekDay;
    if (!doctorIsAvailable) {
      return [];
    }
    const appointments = await db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.doctorId, parsedInput.doctorId),
    });
    const appointmentsOnSelectedDate = appointments
      .filter((appointment) => {
        return dayjs(appointment.date).isSame(parsedInput.date, "day");
      })
      .map((appointment) =>
        dayjs(appointment.date).tz("America/Sao_Paulo").format("HH:mm:ss"),
      );
    const timeSlots = generateTimeSlots();

    const doctorAvailableFrom = dayjs()
      .set("hour", Number(doctor.availableFromTime.split(":")[0]))
      .set("minute", Number(doctor.availableFromTime.split(":")[1]))
      .set("second", 0);
    const doctorAvailableTo = dayjs()
      .set("hour", Number(doctor.availableToTime.split(":")[0]))
      .set("minute", Number(doctor.availableToTime.split(":")[1]))
      .set("second", 0);

    const doctorTimeSlots = timeSlots.filter((time) => {
      const date = dayjs()
        .set("hour", Number(time.split(":")[0]))
        .set("minute", Number(time.split(":")[1]))
        .set("second", 0);

      return (
        date.format("HH:mm:ss") >= doctorAvailableFrom.format("HH:mm:ss") &&
        date.format("HH:mm:ss") <= doctorAvailableTo.format("HH:mm:ss")
      );
    });

    const today = dayjs().format("YYYY-MM-DD");
    const now = dayjs();

    return doctorTimeSlots.map((time) => {
      let isAvailable = !appointmentsOnSelectedDate.includes(time);
      // Se for hoje e o horário já passou, marca como indisponível
      if (parsedInput.date === today) {
        const slotDateTime = dayjs()
          .set("hour", Number(time.split(":")[0]))
          .set("minute", Number(time.split(":")[1]))
          .set("second", 0);
        if (slotDateTime.isBefore(now, "minute")) {
          isAvailable = false;
        }
      }
      return {
        value: time,
        available: isAvailable,
        label: time.substring(0, 5),
      };
    });
  });
