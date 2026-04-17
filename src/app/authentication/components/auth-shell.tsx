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
      <div className="mx-auto max-w-md lg:max-w-none">
        <Button
          asChild
          variant="ghost"
          className="absolute left-3 top-3 z-30 gap-1 text-white/70 hover:bg-white/10 hover:text-white sm:left-6 sm:top-6 lg:hidden"
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        {isDemo && (
          <div className="mb-4 rounded-[1.2rem] border border-violet-300/20 bg-white/8 p-3 text-center text-white shadow-[0_12px_30px_rgba(125,42,232,0.18)] backdrop-blur-md sm:mb-6 sm:rounded-[1.4rem] sm:p-4">
            <h2 className="text-base font-semibold text-violet-100 sm:text-lg">
              Modo Demonstração
            </h2>
            <p className="text-xs text-white/75 sm:text-sm">
              Teste nossa plataforma gratuitamente por 30 dias
            </p>
          </div>
        )}

        <div className="grid gap-3 pt-10 sm:gap-4 sm:pt-12 lg:hidden">
          <div className="grid h-11 grid-cols-2 rounded-2xl border border-white/10 bg-white/6 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:h-[52px]">
            <button
              type="button"
              onClick={() => changeTab("login")}
              className={`rounded-[1rem] text-sm font-medium transition-all ${
                !isRegister
                  ? "bg-[linear-gradient(135deg,_#2563eb_0%,_#4f46e5_55%,_#7c3aed_100%)] text-white shadow-[0_10px_24px_rgba(79,70,229,0.24)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => changeTab("register")}
              className={`rounded-[1rem] text-sm font-medium transition-all ${
                isRegister
                  ? "bg-[linear-gradient(135deg,_#2563eb_0%,_#4f46e5_55%,_#7c3aed_100%)] text-white shadow-[0_10px_24px_rgba(79,70,229,0.24)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              Criar conta
            </button>
          </div>
          {isRegister ? <SignUpForm /> : <LoginForm />}
        </div>

        <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(15,23,42,0.55)_0%,_rgba(2,6,23,0.72)_100%)] lg:grid lg:h-[min(660px,calc(100svh-3.5rem))] lg:grid-cols-2 xl:h-[min(700px,calc(100svh-4rem))]">
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
            className={`absolute inset-y-0 z-20 flex items-center justify-center overflow-hidden bg-[linear-gradient(145deg,_#1d4ed8_0%,_#2563eb_42%,_#6d28d9_100%)] p-8 text-white shadow-[10px_0_30px_rgba(79,70,229,0.22)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)] xl:p-10 ${panelClass}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_30%)]" />
            <div className="relative flex max-w-[280px] flex-col items-center text-center">
              <p className="mb-8 text-sm font-medium uppercase tracking-[0.35em] text-white/70">
                Doctor Schedule
              </p>
              <button
                type="button"
                onClick={() => changeTab(isRegister ? "login" : "register")}
                className="max-w-[220px] rounded-full border-2 border-white/30 px-8 py-4 text-2xl font-semibold leading-tight text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
