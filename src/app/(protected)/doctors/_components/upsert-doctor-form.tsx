import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { medicalSpecialties } from "../_constants";

const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Nome é obrigatório.",
    }),
    specialty: z.string().trim().min(1, {
      message: "Especialidade é obrigatória.",
    }),
    appointmentPrice: z.number().min(1, {
      message: "Preço da consulta é obrigatório.",
    }),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().min(1, {
      message: "Hora de início é obrigatória.",
    }),
    availableToTime: z.string().min(1, {
      message: "Hora de término é obrigatória.",
    }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message:
        "O horário de início não pode ser anterior ao horário de término.",
      path: ["availableToTime"],
    },
  );

const UpsertDoctorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      appointmentPrice: 0,
      availableFromWeekDay: "1",
      availableToWeekDay: "5",
      availableFromTime: "",
      availableToTime: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar médico</DialogTitle>
        <DialogDescription>Adicione um novo médico.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da consulta</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value.floatValue);
                  }}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Domingo</SelectItem>
                    <SelectItem value="1">Segunda</SelectItem>
                    <SelectItem value="2">Terça</SelectItem>
                    <SelectItem value="3">Quarta</SelectItem>
                    <SelectItem value="4">Quinta</SelectItem>
                    <SelectItem value="5">Sexta</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Domingo</SelectItem>
                    <SelectItem value="1">Segunda</SelectItem>
                    <SelectItem value="2">Terça</SelectItem>
                    <SelectItem value="3">Quarta</SelectItem>
                    <SelectItem value="4">Quinta</SelectItem>
                    <SelectItem value="5">Sexta</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="05:00:00">05:00</SelectItem>
                      <SelectItem value="05:30:00">05:30</SelectItem>
                      <SelectItem value="06:00:00">06:00</SelectItem>
                      <SelectItem value="06:30:00">06:30</SelectItem>
                      <SelectItem value="07:00:00">07:00</SelectItem>
                      <SelectItem value="07:30:00">07:30</SelectItem>
                      <SelectItem value="08:00:00">08:00</SelectItem>
                      <SelectItem value="08:30:00">08:30</SelectItem>
                      <SelectItem value="09:00:00">09:00</SelectItem>
                      <SelectItem value="09:30:00">09:30</SelectItem>
                      <SelectItem value="10:00:00">10:00</SelectItem>
                      <SelectItem value="10:30:00">10:30</SelectItem>
                      <SelectItem value="11:00:00">11:00</SelectItem>
                      <SelectItem value="11:30:00">11:30</SelectItem>
                      <SelectItem value="12:00:00">12:00</SelectItem>
                      <SelectItem value="12:30:00">12:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="13:00:00">13:00</SelectItem>
                      <SelectItem value="13:30:00">13:30</SelectItem>
                      <SelectItem value="14:00:00">14:00</SelectItem>
                      <SelectItem value="14:30:00">14:30</SelectItem>
                      <SelectItem value="15:00:00">15:00</SelectItem>
                      <SelectItem value="15:30:00">15:30</SelectItem>
                      <SelectItem value="16:00:00">16:00</SelectItem>
                      <SelectItem value="16:30:00">16:30</SelectItem>
                      <SelectItem value="17:00:00">17:00</SelectItem>
                      <SelectItem value="17:30:00">17:30</SelectItem>
                      <SelectItem value="18:00:00">18:00</SelectItem>
                      <SelectItem value="18:30:00">18:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="19:00:00">19:00</SelectItem>
                      <SelectItem value="19:30:00">19:30</SelectItem>
                      <SelectItem value="20:00:00">20:00</SelectItem>
                      <SelectItem value="20:30:00">20:30</SelectItem>
                      <SelectItem value="21:00:00">21:00</SelectItem>
                      <SelectItem value="21:30:00">21:30</SelectItem>
                      <SelectItem value="22:00:00">22:00</SelectItem>
                      <SelectItem value="22:30:00">22:30</SelectItem>
                      <SelectItem value="23:00:00">23:00</SelectItem>
                      <SelectItem value="23:30:00">23:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="05:00:00">05:00</SelectItem>
                      <SelectItem value="05:30:00">05:30</SelectItem>
                      <SelectItem value="06:00:00">06:00</SelectItem>
                      <SelectItem value="06:30:00">06:30</SelectItem>
                      <SelectItem value="07:00:00">07:00</SelectItem>
                      <SelectItem value="07:30:00">07:30</SelectItem>
                      <SelectItem value="08:00:00">08:00</SelectItem>
                      <SelectItem value="08:30:00">08:30</SelectItem>
                      <SelectItem value="09:00:00">09:00</SelectItem>
                      <SelectItem value="09:30:00">09:30</SelectItem>
                      <SelectItem value="10:00:00">10:00</SelectItem>
                      <SelectItem value="10:30:00">10:30</SelectItem>
                      <SelectItem value="11:00:00">11:00</SelectItem>
                      <SelectItem value="11:30:00">11:30</SelectItem>
                      <SelectItem value="12:00:00">12:00</SelectItem>
                      <SelectItem value="12:30:00">12:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="13:00:00">13:00</SelectItem>
                      <SelectItem value="13:30:00">13:30</SelectItem>
                      <SelectItem value="14:00:00">14:00</SelectItem>
                      <SelectItem value="14:30:00">14:30</SelectItem>
                      <SelectItem value="15:00:00">15:00</SelectItem>
                      <SelectItem value="15:30:00">15:30</SelectItem>
                      <SelectItem value="16:00:00">16:00</SelectItem>
                      <SelectItem value="16:30:00">16:30</SelectItem>
                      <SelectItem value="17:00:00">17:00</SelectItem>
                      <SelectItem value="17:30:00">17:30</SelectItem>
                      <SelectItem value="18:00:00">18:00</SelectItem>
                      <SelectItem value="18:30:00">18:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="19:00:00">19:00</SelectItem>
                      <SelectItem value="19:30:00">19:30</SelectItem>
                      <SelectItem value="20:00:00">20:00</SelectItem>
                      <SelectItem value="20:30:00">20:30</SelectItem>
                      <SelectItem value="21:00:00">21:00</SelectItem>
                      <SelectItem value="21:30:00">21:30</SelectItem>
                      <SelectItem value="22:00:00">22:00</SelectItem>
                      <SelectItem value="22:30:00">22:30</SelectItem>
                      <SelectItem value="23:00:00">23:00</SelectItem>
                      <SelectItem value="23:30:00">23:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
