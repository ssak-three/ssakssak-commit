import Image from "next/image";
import LoadingContent from "@/app/(with-layout)/loading/loading-content";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-20 text-center">
      <Image src="/loading.svg" width={200} height={200} alt="loading" />
      <p className="font-m mt-6 mb-2 text-5xl">Loading</p>
      <p className="mb-10 text-2xl text-neutral-600">
        리포트 결과를 분석 중입니다...
      </p>

      <LoadingContent />
    </div>
  );
};

export default LoadingPage;
