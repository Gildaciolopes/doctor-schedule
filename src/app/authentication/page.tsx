import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async ({
  searchParams,
}: {
  searchParams: { demo?: string };
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }

  const isDemo = searchParams.demo === "true";

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px]">
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
