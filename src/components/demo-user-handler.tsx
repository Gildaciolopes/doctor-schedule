"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const DemoUserHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAndUpdateDemoStatus = async () => {
      const isDemoUser = localStorage.getItem("isDemoUser");

      if (isDemoUser === "true") {
        try {
          const res = await fetch("/api/auth/update-demo-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDemoUser: true }),
          });

          if (res.ok) {
            localStorage.removeItem("isDemoUser");
            // Força o servidor a reler a sessão com isDemoUser atualizado
            router.refresh();
          }
        } catch (error) {
          console.error("Erro ao atualizar status demo:", error);
        }
      }
    };

    checkAndUpdateDemoStatus();
  }, [router]);

  return null;
};
