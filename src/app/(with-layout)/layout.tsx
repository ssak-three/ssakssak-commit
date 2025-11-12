import SideNav from "@/app/ui/layout/side-nav";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import SignHeader from "@/app/ui/layout/nav/sign-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <>
      <div className="sticky top-0 z-50 h-16 bg-white/80 backdrop-blur print:hidden">
        <SignHeader isLoggedIn={isLoggedIn} />
      </div>

      {isLoggedIn ? (
        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden md:flex-row print:block print:h-auto print:overflow-visible">
          <div className="w-full flex-none md:w-64 print:hidden">
            <SideNav />
          </div>
          <main className="flex-1 overflow-y-auto md:px-12 md:py-4 md:pb-0 print:overflow-visible">
            {children}
          </main>
        </div>
      ) : (
        <div className="h-[calc(100vh-4rem)] print:h-auto">
          <main className="mx-auto h-full max-w-screen-xl overflow-y-auto px-6 pt-2 pb-0 print:h-auto print:overflow-visible">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
