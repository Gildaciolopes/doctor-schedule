"use client";

import {
  Check,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Entity = "doctors" | "patients" | "appointments";
type Format = "excel" | "pdf";

interface ExportButtonProps {
  entity: Entity;
}

export function ExportButton({ entity }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Format>("excel");
  const [loading, setLoading] = useState(false);

  const download = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/export/${entity}?format=${selected}`);

      if (!res.ok) throw new Error("Falha na exportação");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        res.headers
          .get("Content-Disposition")
          ?.split('filename="')[1]
          ?.replace('"', "") ??
        `export.${selected === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success(
        `Arquivo ${selected === "excel" ? "Excel" : "PDF"} gerado com sucesso.`,
      );
      setOpen(false);
    } catch {
      toast.error("Erro ao exportar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[720px]">
          {/* Header */}
          <DialogHeader className="border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                <Download className="text-primary h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">
                  Exportar dados
                </DialogTitle>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Escolha o formato do arquivo
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Format cards */}
          <div className="grid grid-cols-2 gap-3 p-5">
            <FormatCard
              format="excel"
              selected={selected === "excel"}
              onSelect={() => setSelected("excel")}
            />
            <FormatCard
              format="pdf"
              selected={selected === "pdf"}
              onSelect={() => setSelected("pdf")}
            />
          </div>

          {/* Footer */}
          <div className="border-t px-5 pb-5">
            <Button className="w-full" onClick={download} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exportando…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar como {selected === "excel" ? "Excel" : "PDF"}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Format Card ─────────────────────────────────────────────────────────────

const EXCEL_PATTERN = `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6h24M0 12h24M0 18h24M6 0v24M12 0v24M18 0v24' stroke='%2316a34a' stroke-width='0.4' opacity='0.25'/%3E%3C/svg%3E")`;
const PDF_PATTERN = `url("data:image/svg+xml,%3Csvg width='24' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4h24' stroke='%23e11d48' stroke-width='0.4' opacity='0.25'/%3E%3C/svg%3E")`;

interface FormatCardProps {
  format: Format;
  selected: boolean;
  onSelect: () => void;
}

function FormatCard({ format, selected, onSelect }: FormatCardProps) {
  const isExcel = format === "excel";
  const Icon = isExcel ? FileSpreadsheet : FileText;
  const label = isExcel ? "Excel" : "PDF";
  const extension = isExcel ? ".xlsx" : ".pdf";
  const description = isExcel
    ? "Editável com filtros e fórmulas"
    : "Formatado para impressão";

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        backgroundImage: selected
          ? isExcel
            ? EXCEL_PATTERN
            : PDF_PATTERN
          : undefined,
      }}
      className={[
        "relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 px-4 py-5 text-left transition-all duration-150 select-none",
        selected
          ? isExcel
            ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40"
            : "border-rose-500 bg-rose-50/60 dark:bg-rose-950/40"
          : "border-border bg-muted/30 hover:bg-muted/60",
      ].join(" ")}
    >
      {/* Check badge */}
      <span
        className={[
          "absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-150",
          selected
            ? isExcel
              ? "scale-100 bg-emerald-500 opacity-100"
              : "scale-100 bg-rose-500 opacity-100"
            : "bg-border scale-75 opacity-0",
        ].join(" ")}
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </span>

      {/* Icon */}
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-150",
          selected
            ? isExcel
              ? "bg-emerald-100 dark:bg-emerald-900/50"
              : "bg-rose-100 dark:bg-rose-900/50"
            : "bg-muted",
        ].join(" ")}
      >
        <Icon
          className={[
            "h-6 w-6 transition-colors duration-150",
            selected
              ? isExcel
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-500 dark:text-rose-400"
              : "text-muted-foreground",
          ].join(" ")}
        />
      </div>

      {/* Label + extension */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className={[
            "text-sm font-semibold transition-colors duration-150",
            selected ? "text-foreground" : "text-muted-foreground",
          ].join(" ")}
        >
          {label}
        </span>
        <span
          className={[
            "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium transition-all duration-150",
            selected
              ? isExcel
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                : "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {extension}
        </span>
      </div>

      {/* Description */}
      <p
        className={[
          "text-center text-[11px] leading-snug transition-colors duration-150",
          selected ? "text-muted-foreground" : "text-muted-foreground/60",
        ].join(" ")}
      >
        {description}
      </p>
    </button>
  );
}
