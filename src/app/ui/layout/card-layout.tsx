import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  hideTitle?: boolean;
  title?: string;
  body?: ReactNode;
  actions?: ReactNode;
  cardSrc?: string;
};

function CardLayout({
  hideTitle,
  title,
  body,
  actions,
  cardSrc = "/login.svg",
}: Props) {
  const cardPad = "p-10 md:p-12";
  const gapY = "gap-8 md:gap-10";
  const imgSize = 520;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F0E6]">
      <main className="mx-auto flex w-full max-w-5xl items-center px-4">
        <div
          className={`grid w-full ${gapY} rounded-3xl bg-white ${cardPad} shadow-xl md:grid-cols-2`}
        >
          <section className="flex flex-col justify-center gap-6">
            {!hideTitle && title && (
              <h1 className="text-center text-4xl font-semibold">{title}</h1>
            )}
            {body && (
              <div className="text-[15px] leading-7 break-words whitespace-pre-wrap text-neutral-700">
                {body}
              </div>
            )}
            {actions}
          </section>

          <div className="flex items-center justify-center">
            <Image
              src={cardSrc}
              width={imgSize}
              height={imgSize}
              alt="image"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CardLayout;
