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

// Colunas: Nome | Email | Telefone | Sexo | (ações)
const COL_WIDTHS = [120, 160, 104, 72, 32] as const;

// Per-row variation to feel like real data
const NAME_W = [108, 124, 96, 116, 88, 132, 100, 112] as const;
const EMAIL_W = [148, 164, 136, 156, 128, 172, 140, 152] as const;
const PHONE_W = [100, 100, 100, 100, 100, 100, 100, 100] as const;
const SEX_W = [72, 64, 72, 64, 72, 64, 72, 64] as const;

export default function PatientsLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <Skeleton className="h-7 w-28" />
          </PageTitle>
          <PageDescription>
            <Skeleton className="mt-1 h-4 w-52" />
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Skeleton className="h-9 w-40 rounded-md" />
        </PageActions>
      </PageHeader>

      <PageContent>
        <Card>
          <CardHeader className="pb-3">
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
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: NAME_W[i] }}
                />
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: EMAIL_W[i] }}
                />
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: PHONE_W[i] }}
                />
                <Skeleton
                  className="h-4 shrink-0"
                  style={{ width: SEX_W[i] }}
                />
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
