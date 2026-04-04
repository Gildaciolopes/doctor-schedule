"use client";

import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Entity = "doctors" | "patients" | "appointments";

interface ExportButtonProps {
  entity: Entity;
}

export function ExportButton({ entity }: ExportButtonProps) {
  const [loading, setLoading] = useState<"excel" | "pdf" | null>(null);

  const download = async (format: "excel" | "pdf") => {
    if (loading) return;
    setLoading(format);

    try {
      const res = await fetch(`/api/export/${entity}?format=${format}`);

      if (!res.ok) {
        throw new Error("Falha na exportação");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        res.headers
          .get("Content-Disposition")
          ?.split('filename="')[1]
          ?.replace('"', "") ?? `export.${format === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success(
        `Arquivo ${format === "excel" ? "Excel" : "PDF"} gerado com sucesso.`,
      );
    } catch {
      toast.error("Erro ao exportar. Tente novamente.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={loading !== null}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {loading ? "Exportando..." : "Exportar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Formato</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => download("excel")}
          disabled={loading !== null}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" />
          Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => download("pdf")}
          disabled={loading !== null}
        >
          <FileText className="mr-2 h-4 w-4 text-red-500" />
          PDF (.pdf)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
