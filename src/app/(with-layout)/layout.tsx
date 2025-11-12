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
      <div className="print:hidden">
        <SignHeader isLoggedIn={isLoggedIn} />
      </div>

      {isLoggedIn ? (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden print:block print:h-auto">
          <div className="w-full flex-none md:w-64 print:hidden">
            <SideNav />
          </div>
          <main className="flex-1 md:px-12 md:py-4 md:pb-0 print:w-full print:overflow-visible print:p-0">
            {children}
          </main>
        </div>
      ) : (
        <main className="mx-auto max-w-screen-xl px-6 pt-2 pb-0 print:max-w-full print:p-0">
          {children}
        </main>
      )}
    </>
  );
}
