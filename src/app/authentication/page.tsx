import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "@/lib/get-session";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) => {
  const session = await getSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const isDemo = resolvedSearchParams.demo === "true";

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px]">
        <Button
          asChild
          variant="ghost"
          className="text-muted-foreground hover:text-foreground mb-4 -ml-2 gap-1"
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        {isDemo && (
          <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 text-center dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              🎯 Modo Demonstração
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Teste nossa plataforma gratuitamente por 30 dias
            </p>
          </div>
        )}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
