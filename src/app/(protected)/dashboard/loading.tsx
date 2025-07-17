import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function DashboardLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <Skeleton className="mb-2 h-8 w-40" />
          </PageTitle>
          <PageDescription>
            <span>
              <Skeleton className="inline-block h-4 w-64" />
            </span>
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Skeleton className="h-10 w-40" />
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* Cards de estatísticas */}
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="gap-2">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  <Skeleton className="h-4 w-20" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Gráfico e Médicos */}
        <div className="mb-4 grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader>
              <Skeleton className="mb-2 h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="mb-2 h-6 w-32" />
            </CardHeader>
            <CardContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4 flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Tabela de agendamentos e especialidades */}
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <CardTitle className="text-base">
                  <Skeleton className="h-4 w-32" />
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-2 flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="mb-2 h-6 w-32" />
            </CardHeader>
            <CardContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4 flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageContainer>
  );
}
