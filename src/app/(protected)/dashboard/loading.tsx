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

export default function DashboardLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <Skeleton className="h-7 w-36" />
          </PageTitle>
          <PageDescription>
            <Skeleton className="mt-1 h-4 w-52" />
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Skeleton className="h-9 w-44 rounded-md" />
        </PageActions>
      </PageHeader>

      <PageContent>
        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[28, 36, 32, 24].map((w, i) => (
            <Card key={i} style={{ animationDelay: `${i * 60}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Skeleton className={`h-7 w-${w}`} />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart + Top Doctors */}
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              {/* Chart bars */}
              <div className="flex h-48 items-end gap-2 px-2">
                {[60, 80, 45, 90, 55, 75, 40, 85, 65, 70, 50, 88].map(
                  (h, i) => (
                    <Skeleton
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{ height: `${h}%`, animationDelay: `${i * 40}ms` }}
                    />
                  ),
                )}
              </div>
              {/* X-axis labels */}
              <div className="mt-2 flex gap-2 px-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-3 flex-1"
                    style={{ animationDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-28" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-8 shrink-0 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Appointments table + Top Specialties */}
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent>
              {/* Table header */}
              <div className="mb-3 flex gap-4 border-b pb-2">
                {[80, 72, 88, 68, 56].map((w, i) => (
                  <Skeleton key={i} className="h-3.5" style={{ width: w }} />
                ))}
              </div>
              {/* Table rows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-4 py-2.5"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-5 w-10 shrink-0 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageContainer>
  );
}
