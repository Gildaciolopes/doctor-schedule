"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import LoginForm from "./login-form";
import SignUpForm from "./sign-up-form";

type AuthShellProps = {
  isDemo: boolean;
};

const AuthShell = ({ isDemo }: AuthShellProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const isRegister = activeTab === "register";

  const changeTab = (nextTab: "login" | "register") => {
    if (nextTab === activeTab) return;
    setActiveTab(nextTab);
  };

  const panelClass =
    isRegister
      ? "left-1/2 w-1/2 rounded-l-[2rem] rounded-r-none"
      : "left-0 w-1/2 rounded-l-none rounded-r-[2rem]";

  return (
    <div className="relative p-3 sm:p-6 lg:p-8 xl:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-32 rounded-full bg-primary/8 blur-3xl lg:inset-x-16" />
      <div className="mx-auto max-w-md lg:max-w-none">
        <Button
          asChild
          variant="ghost"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute left-3 top-3 z-30 gap-1 sm:left-6 sm:top-6 lg:hidden"
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        {isDemo && (
          <div className="auth-shadow-soft bg-gradient-to-r from-card/96 via-card/92 to-card/86 text-card-foreground mb-4 rounded-[1.2rem] border border-border/80 p-3 text-center backdrop-blur-md sm:mb-6 sm:rounded-[1.4rem] sm:p-4">
            <h2 className="text-base font-semibold sm:text-lg">
              Modo Demonstração
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Teste nossa plataforma gratuitamente por 30 dias
            </p>
          </div>
        )}

        <div className="grid gap-3 pt-10 sm:gap-4 sm:pt-12 lg:hidden">
          <div className="bg-muted/70 grid h-11 grid-cols-2 rounded-2xl border border-border/80 p-1 shadow-sm shadow-primary/5 backdrop-blur-sm sm:h-[52px]">
            <button
              type="button"
              onClick={() => changeTab("login")}
              className={`rounded-[1rem] text-sm font-medium transition-all ${
                !isRegister
                  ? "bg-background/95 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => changeTab("register")}
              className={`rounded-[1rem] text-sm font-medium transition-all ${
                isRegister
                  ? "bg-background/95 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Criar conta
            </button>
          </div>
          {isRegister ? <SignUpForm /> : <LoginForm />}
        </div>

        <div className="auth-shadow-shell bg-gradient-to-br from-card/92 via-card/84 to-card/78 relative hidden overflow-hidden rounded-[2rem] border border-border/80 lg:grid lg:h-[min(660px,calc(100svh-3.5rem))] lg:grid-cols-2 xl:h-[min(700px,calc(100svh-4rem))]">
          <div className="pointer-events-none absolute inset-x-[12%] top-0 h-28 rounded-full bg-chart-1/12 blur-3xl" />
          <div className="flex items-stretch justify-center p-4 xl:p-5">
            <div className="h-full w-full max-w-[350px] xl:max-w-[360px]">
              <SignUpForm />
            </div>
          </div>

          <div className="flex items-stretch justify-center p-4 xl:p-5">
            <div className="h-full w-full max-w-[350px] xl:max-w-[360px]">
              <LoginForm />
            </div>
          </div>

          <div
            className={`auth-shadow-panel bg-gradient-to-br from-chart-1 via-primary to-chart-4 text-foreground absolute inset-y-0 z-20 flex items-center justify-center overflow-hidden p-8 transition-all duration-700 [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)] xl:p-10 ${panelClass}`}
          >
            <div className="bg-foreground/10 absolute inset-0" />
            <div className="bg-foreground/12 absolute -left-10 top-12 h-28 w-28 rounded-full blur-2xl" />
            <div className="bg-background/10 absolute bottom-10 right-[-10%] h-36 w-36 rounded-full blur-3xl" />
            <div className="relative flex max-w-[280px] flex-col items-center text-center">
              <p className="text-foreground/70 mb-8 text-sm font-medium uppercase tracking-[0.35em]">
                Doctor Schedule
              </p>
              <button
                type="button"
                onClick={() => changeTab(isRegister ? "login" : "register")}
                className="auth-shadow-soft group max-w-[220px] rounded-full border-2 border-foreground/30 bg-foreground/6 px-8 py-4 text-2xl font-semibold leading-tight text-foreground transition-all duration-300 hover:bg-foreground"
              >
                <span className="transition-opacity duration-300 group-hover:bg-gradient-to-r group-hover:from-chart-1 group-hover:via-primary group-hover:to-chart-4 group-hover:bg-clip-text group-hover:text-transparent">
                  {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
