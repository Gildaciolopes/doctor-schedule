import { Card, CardContent } from "@/components/ui/card";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionLoading() {
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
      </PageHeader>
      <PageContent>
        <Card className="mx-auto w-[350px]">
          <CardContent className="flex flex-col items-center p-6">
            <Skeleton className="mb-4 h-8 w-32" />
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
