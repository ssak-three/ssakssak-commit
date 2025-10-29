import CardLayout from "@/app/ui/layout/card-layout";
import NavigateButton from "@/app/ui/common/navigate-button";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  const param = await searchParams;
  const title = param.status ?? "이런! 오류가 발생했어요!";
  const message = param.message ?? SYSTEM_ERROR_MESSAGES.UNKNOWN;

  return (
    <CardLayout
      title={String(title)}
      body={<p>{message}</p>}
      actions={
        <NavigateButton to="/">리포트 생성 페이지로 이동</NavigateButton>
      }
      cardSrc="/error-cat.svg"
    />
  );
}

export default ErrorPage;
