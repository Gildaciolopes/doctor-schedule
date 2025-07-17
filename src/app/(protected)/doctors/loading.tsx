import { Card, CardContent } from "@/components/ui/card";
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

export default function DoctorsLoading() {
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
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col items-center p-6">
                <Skeleton className="mb-4 h-16 w-16 rounded-full" />
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </PageContainer>
  );
}
