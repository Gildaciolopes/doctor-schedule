import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { Skeleton } from "@/components/ui/skeleton";

// Colunas: Paciente | Médico | Data e Hora | Especialidade | Valor | (ações)
const COL_WIDTHS = [120, 112, 140, 108, 72, 32] as const;

export default function AppointmentsLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <Skeleton className="h-7 w-40" />
          </PageTitle>
          <PageDescription>
            <Skeleton className="mt-1 h-4 w-56" />
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Skeleton className="h-9 w-40 rounded-md" />
        </PageActions>
      </PageHeader>

      <PageContent>
        <Card>
          <CardHeader className="pb-3">
            {/* Search / filter bar */}
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-9 w-64 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Table header */}
            <div className="mb-1 flex items-center gap-4 border-b py-3">
              {COL_WIDTHS.map((w, i) => (
                <Skeleton
                  key={i}
                  className="h-3.5 shrink-0"
                  style={{ width: w }}
                />
              ))}
            </div>
            {/* Table rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b py-3.5 last:border-0"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Paciente */}
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: [100, 116, 92, 108, 96, 120, 88, 104][i] }}
                />
                {/* Médico */}
                <Skeleton className="h-4 w-24 shrink-0" />
                {/* Data e Hora */}
                <Skeleton className="h-4 w-32 shrink-0" />
                {/* Especialidade */}
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: [88, 104, 76, 96, 80, 112, 68, 92][i] }}
                />
                {/* Valor */}
                <Skeleton className="h-4 w-16 shrink-0" />
                {/* Ações */}
                <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
              </div>
            ))}
            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-md" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
