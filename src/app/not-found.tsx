import CardLayout from "@/app/ui/layout/card-layout";
import NavigateButton from "@/app/ui/common/navigate-button";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

function NotFoundPage() {
  return (
    <CardLayout
      title="요청하신 페이지를 찾을 수 없습니다!"
      body={<p>{SYSTEM_ERROR_MESSAGES.UNKNOWN}</p>}
      actions={
        <NavigateButton to="/">리포트 생성 페이지로 이동</NavigateButton>
      }
      cardSrc="/error-cat.svg"
    />
  );
}

export default NotFoundPage;
