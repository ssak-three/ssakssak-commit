import AuthActions from "@/app/ui/auth/auth-action";
import CardLayout from "@/app/ui/layout/card-layout";
import {
  AUTH_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";

type ErrorCode = keyof typeof AUTH_ERROR_MESSAGES;

async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;
  const code = (params?.code ?? "UNKNOWN") as ErrorCode;
  const message = AUTH_ERROR_MESSAGES[code] ?? SYSTEM_ERROR_MESSAGES.UNKNOWN;

  return (
    <CardLayout
      title={code}
      body={<p>{message}</p>}
      actions={<AuthActions callbackUrl="/" />}
      cardSrc="/error-cat.svg"
    />
  );
}

export default AuthErrorPage;
