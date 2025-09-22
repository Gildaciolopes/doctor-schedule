"use client";

import { useEffect } from "react";

export const DemoUserHandler = () => {
  useEffect(() => {
    const checkAndUpdateDemoStatus = async () => {
      const isDemoUser = localStorage.getItem("isDemoUser");

      if (isDemoUser === "true") {
        try {
          await fetch("/api/auth/update-demo-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDemoUser: true }),
          });

          // Remover do localStorage após atualizar
          localStorage.removeItem("isDemoUser");
        } catch (error) {
          console.error("Erro ao atualizar status demo:", error);
        }
      }
    };

    checkAndUpdateDemoStatus();
  }, []);

  return null; // Este componente não renderiza nada
};
