"use server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);
dayjs.extend(timezone);

export const upsertDoctor = protectedWithClinicActionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput, ctx }) => {
    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: ctx.user.clinic.id,
        availableFromTime: parsedInput.availableFromTime,
        availableToTime: parsedInput.availableToTime,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: parsedInput.availableFromTime,
          availableToTime: parsedInput.availableToTime,
        },
      });
    revalidatePath("/doctors");
  });
