"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import {
  authCardClassName,
  authFieldLabelClassName,
  authFieldMessageClassName,
  authFieldMessageWrapperClassName,
  authInputClassName,
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
} from "./auth-form-styles";
import AuthPasswordField from "./auth-password-field";
import {
  emailSchema,
  isInvalidCredentialsError,
  loginPasswordSchema,
} from "./auth-validation";

const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

const ButtonSpinner = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className ?? ""}`}
  />
);

const LoginForm = () => {
  const router = useRouter();
  const [activeAction, setActiveAction] = useState<"submit" | "google" | null>(
    null,
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    form.clearErrors("root");
    setActiveAction("submit");

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setIsNavigating(true);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (isInvalidCredentialsError(ctx.error)) {
            setActiveAction(null);
            form.setError("root", {
              type: "manual",
              message: "E-mail ou senha inválidos.",
            });
            form.setFocus("password");
            return;
          }

          setActiveAction(null);
          toast.error("Não foi possível entrar agora. Tente novamente.");
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    setActiveAction("google");
    setIsGoogleSubmitting(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        scopes: ["email", "profile"],
      });
      setIsNavigating(true);
    } catch {
      setActiveAction(null);
      setIsGoogleSubmitting(false);
      toast.error("Não foi possível iniciar o login com Google.");
    }
  };

  const clearRootError = () => {
    if (form.formState.errors.root) {
      form.clearErrors("root");
    }
  };

  const isBusy = form.formState.isSubmitting || isGoogleSubmitting || isNavigating;
  const isSubmitLoading =
    form.formState.isSubmitting || (isNavigating && activeAction === "submit");
  const isGoogleLoading =
    isGoogleSubmitting || (isNavigating && activeAction === "google");

  return (
    <div className={authCardClassName}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full min-h-0 flex-col"
          noValidate
        >
          <div className="space-y-1">
            <h3 className="text-foreground text-[1.65rem] font-semibold tracking-tight sm:text-2xl lg:text-[1.85rem]">
              Bem-vindo de volta
            </h3>
            <p className="text-muted-foreground text-sm leading-5 lg:leading-5">
              Entre com seu e-mail e senha para acessar sua agenda com
              segurança.
            </p>
          </div>

          <div className="mt-4 flex-1 sm:mt-5 lg:mt-4">
            <div className="space-y-2.5 lg:space-y-2">
              <div className="min-h-5" aria-live="polite">
                {form.formState.errors.root?.message ? (
                  <p className="bg-destructive/8 text-destructive rounded-xl border border-destructive/20 px-3 py-2 text-sm">
                    {form.formState.errors.root.message}
                  </p>
                ) : null}
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5 lg:space-y-1">
                    <FormLabel className={authFieldLabelClassName}>
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="email"
                        autoFocus
                        inputMode="email"
                        placeholder="Digite seu e-mail"
                        className={authInputClassName}
                        onChange={(event) => {
                          field.onChange(event);
                          clearRootError();
                        }}
                      />
                    </FormControl>
                    <div className={authFieldMessageWrapperClassName}>
                      <FormMessage className={authFieldMessageClassName} />
                    </div>
                  </FormItem>
                )}
              />

              <AuthPasswordField
                autoComplete="current-password"
                control={form.control}
                label="Senha"
                name="password"
                onValueChange={clearRootError}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="mt-2.5 space-y-3 border-t border-border/80 pt-2.5 lg:mt-2 lg:space-y-2.5 lg:pt-2">
            <Button
              type="submit"
              className={authPrimaryButtonClassName}
              disabled={isBusy}
              aria-label={isSubmitLoading ? "Entrando" : "Entrar"}
            >
              {isSubmitLoading ? <ButtonSpinner /> : "Entrar"}
            </Button>
            <Button
              variant="outline"
              className={authSecondaryButtonClassName}
              type="button"
              onClick={handleGoogleLogin}
              disabled={isBusy}
              aria-label={
                isGoogleLoading ? "Abrindo login com Google" : "Entrar com Google"
              }
            >
              {isGoogleLoading ? (
                <ButtonSpinner />
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="text-muted-foreground h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M21.8 12.23c0-.7-.06-1.37-.18-2.01H12v3.8h5.5a4.7 4.7 0 0 1-2.04 3.08v2.5h3.3c1.93-1.78 3.04-4.4 3.04-7.37Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 22c2.76 0 5.07-.9 6.76-2.44l-3.3-2.5c-.92.61-2.08.97-3.46.97-2.66 0-4.91-1.8-5.72-4.2H2.88v2.57A10 10 0 0 0 12 22Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.28 13.83A6 6 0 0 1 5.96 12c0-.63.11-1.23.32-1.83V7.6H2.88A10 10 0 0 0 2 12c0 1.6.38 3.1 1.04 4.4l3.24-2.57Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 5.97c1.5 0 2.86.52 3.92 1.53l2.93-2.93C17.05 2.9 14.74 2 12 2a10 10 0 0 0-9.12 5.6l3.4 2.57c.8-2.4 3.06-4.2 5.72-4.2Z"
                      fill="currentColor"
                    />
                  </svg>
                  Entrar com Google
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
