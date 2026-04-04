import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionLoading() {
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
      </PageHeader>

      <PageContent>
        <div className="pb-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
            {/* Left column */}
            <div className="flex flex-col gap-8">
              {/* Hero heading */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-4/5" />
                  <Skeleton className="h-10 w-3/5" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <Skeleton className="h-4 w-full max-w-lg" />
                  <Skeleton className="h-4 w-4/5 max-w-md" />
                </div>
              </div>

              {/* Alert banner */}
              <div className="flex items-start gap-3 rounded-xl border px-4 py-3.5">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
                    <Skeleton className="mb-2 h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="flex gap-5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>

            {/* Right column — pricing card */}
            <div className="overflow-hidden rounded-2xl border">
              {/* Card header (gradient area) */}
              <div className="bg-muted/60 px-6 py-6">
                <Skeleton className="mb-1 h-3 w-12" />
                <Skeleton className="mb-3 h-7 w-28" />
                <Skeleton className="mb-4 h-4 w-52" />
                <div className="flex items-baseline gap-1">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              {/* Card body */}
              <div className="px-6 py-6">
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                      style={{ animationDelay: `${i * 55}ms` }}
                    >
                      <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                      <Skeleton
                        className="h-4"
                        style={{ width: [144, 128, 96, 136, 104, 112][i] }}
                      />
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2.5">
                  <Skeleton className="h-11 w-full rounded-md" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex justify-center border-t pt-6">
            <Skeleton className="h-4 w-80" />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
