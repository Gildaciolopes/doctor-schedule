import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Larguras variadas para os badges simularem texto real
const BADGE_WIDTHS = [
  [120, 96, 80], // card 0
  [136, 88, 88], // card 1
  [112, 100, 76], // card 2
  [128, 92, 84], // card 3
  [120, 96, 80], // card 4
  [104, 88, 88], // card 5
] as const;

const NAME_WIDTHS = [96, 112, 88, 104, 100, 92] as const;
const SPEC_WIDTHS = [72, 80, 68, 76, 84, 64] as const;

export default function DoctorsLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <Skeleton className="h-7 w-28" />
          </PageTitle>
          <PageDescription>
            <Skeleton className="mt-1 h-4 w-48" />
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Skeleton className="h-9 w-36 rounded-md" />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border"
              style={{ animationDelay: `${i * 65}ms` }}
            >
              {/* Card header — avatar + name + specialty */}
              <div className="flex items-center gap-3 p-5">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton
                    style={{ width: NAME_WIDTHS[i], height: 14 }}
                    className="rounded"
                  />
                  <Skeleton
                    style={{ width: SPEC_WIDTHS[i], height: 12 }}
                    className="rounded"
                  />
                </div>
              </div>

              <Separator />

              {/* Badges — calendar, clock, price */}
              <div className="flex flex-col gap-2 p-5">
                {BADGE_WIDTHS[i].map((w, j) => (
                  <Skeleton
                    key={j}
                    className="h-6 rounded-full"
                    style={{ width: w, animationDelay: `${i * 65 + j * 40}ms` }}
                  />
                ))}
              </div>

              <Separator />

              {/* Footer — two buttons */}
              <div className="flex flex-col gap-2 p-5">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </PageContainer>
  );
}
