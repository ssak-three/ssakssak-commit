import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-20 text-center">
      <Image src="/loading.svg" width={200} height={200} alt="loading" />

      <p className="font-m pt-10 pb-5 text-5xl">Loading</p>
      <p className="text-2xl text-neutral-600">
        리포트 결과를 분석 중입니다...
      </p>
    </div>
  );
};

export default LoadingPage;
