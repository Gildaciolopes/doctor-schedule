"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    form.clearErrors("root");

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (isInvalidCredentialsError(ctx.error)) {
            form.setError("root", {
              type: "manual",
              message: "E-mail ou senha inválidos.",
            });
            return;
          }

          toast.error("Não foi possível entrar agora. Tente novamente.");
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      scopes: ["email", "profile"],
    });
  };

  const clearRootError = () => {
    if (form.formState.errors.root) {
      form.clearErrors("root");
    }
  };

  return (
    <div className={authCardClassName}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full min-h-0 flex-col"
        >
          <div className="space-y-1">
            <h3 className="text-[1.65rem] font-semibold tracking-tight text-white sm:text-2xl lg:text-[1.85rem]">
              Bem-vindo de volta
            </h3>
            <p className="text-sm leading-5 text-white/65 lg:leading-5">
              Faça login para continuar com sua agenda.
            </p>
          </div>

          <div className="mt-4 flex-1 sm:mt-5 lg:mt-4">
            <div className="space-y-2.5 lg:space-y-2">
              <div className="min-h-5">
                {form.formState.errors.root?.message ? (
                  <p className="text-sm text-rose-200">
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
                control={form.control}
                label="Senha"
                name="password"
                onValueChange={clearRootError}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="mt-2.5 space-y-3 border-t border-white/8 pt-2.5 lg:mt-2 lg:space-y-2.5 lg:pt-2">
            <Button
              type="submit"
              className={authPrimaryButtonClassName}
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
            <Button
              variant="outline"
              className={authSecondaryButtonClassName}
              type="button"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Entrar com Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
