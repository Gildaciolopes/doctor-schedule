"use client";

import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvailability } from "../_helpers/availability";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] =
    useState(false);

  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  const availability = getAvailability(doctor);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} a {availability.to.format("dddd")}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} as{" "}
          {availability.to.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertDoctorDialogOpen}
          onOpenChange={setIsUpsertDoctorDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
            onSuccess={() => setIsUpsertDoctorDialogOpen(false)}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
