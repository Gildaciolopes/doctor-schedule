import { z } from "zod";

const weakPasswords = new Set([
  "12345678",
  "123456789",
  "1234567890",
  "password",
  "password123",
  "qwerty123",
  "senha123",
  "admin123",
  "123123123",
]);

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Informe o e-mail" })
  .email({ message: "E-mail inválido" });

export const strongPasswordSchema = z
  .string()
  .trim()
  .min(8, { message: "Use pelo menos 8 caracteres" })
  .refine((value) => /[a-z]/.test(value), {
    message: "Inclua uma letra minúscula",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Inclua uma letra maiúscula",
  })
  .refine((value) => /\d/.test(value), {
    message: "Inclua um número",
  })
  .refine((value) => /[^A-Za-z0-9]/.test(value), {
    message: "Inclua um símbolo",
  })
  .refine((value) => !weakPasswords.has(value.toLowerCase()), {
    message: "Escolha uma senha menos óbvia",
  });

export const loginPasswordSchema = z.string().trim().min(1, { message: "" });

export const isInvalidCredentialsError = (error: {
  code?: string;
  message?: string;
}) =>
  error.code === "INVALID_EMAIL_OR_PASSWORD" ||
  error.code === "INVALID_CREDENTIALS" ||
  error.message?.toLowerCase().includes("invalid") === true;
