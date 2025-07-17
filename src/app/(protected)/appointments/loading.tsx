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

export default function AppointmentsLoading() {
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
        <Card>
          <CardContent>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="mb-2 flex items-center gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
