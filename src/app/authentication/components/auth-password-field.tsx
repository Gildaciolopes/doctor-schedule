"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  authFieldLabelClassName,
  authFieldMessageClassName,
  authFieldMessageWrapperClassName,
  authPasswordInputClassName,
} from "./auth-form-styles";

type AuthPasswordFieldProps<TFieldValues extends FieldValues> = {
  autoComplete?: string;
  control: Control<TFieldValues>;
  label: string;
  name: FieldPath<TFieldValues>;
  onValueChange?: () => void;
  placeholder: string;
  showHint?: string;
};

const AuthPasswordField = <TFieldValues extends FieldValues>({
  autoComplete,
  control,
  label,
  name,
  onValueChange,
  placeholder,
  showHint,
}: AuthPasswordFieldProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5 lg:space-y-1">
          <FormLabel className={authFieldLabelClassName}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                autoComplete={autoComplete}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                className={authPasswordInputClassName}
                onChange={(event) => {
                  field.onChange(event);
                  onValueChange?.();
                }}
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-400 transition-colors hover:text-slate-700 dark:text-white/55 dark:hover:text-white sm:right-4"
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                ) : (
                  <Eye className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </FormControl>
          <div className={authFieldMessageWrapperClassName}>
            <FormMessage className={authFieldMessageClassName} />
          </div>
          {showHint ? (
            <p className="text-[11px] leading-4 text-slate-400 dark:text-white/45">
              {showHint}
            </p>
          ) : null}
        </FormItem>
      )}
    />
  );
};

export default AuthPasswordField;
