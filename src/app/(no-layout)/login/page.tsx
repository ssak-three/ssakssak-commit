import CardLayout from "@/app/ui/layout/card-layout";
import AuthActions from "@/app/ui/auth/auth-action";
import AuthSwitch from "@/app/ui/auth/auth-switch";

function LoginPage() {
  return (
    <CardLayout
      hideTitle
      body={<AuthSwitch />}
      actions={<AuthActions callbackUrl="/" showSecondary={false} />}
      cardSrc="/login.svg"
    />
  );
}

export default LoginPage;
