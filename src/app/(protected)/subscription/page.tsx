import { headers } from "next/headers";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";
const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <WithAuthentication mustHaveClinic>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Assinaturas</PageTitle>
            <PageDescription>Gerencie a sua assinatura.</PageDescription>
          </PageHeaderContent>
        </PageHeader>
        <PageContent>
          <SubscriptionPlan
            className="w-[350px]"
            active={session!.user.plan === "essential"}
            userEmail={session!.user.email}
          />
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default SubscriptionPage;
