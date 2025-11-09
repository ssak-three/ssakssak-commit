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
      <SignHeader isLoggedIn={isLoggedIn} />

      {isLoggedIn ? (
        <div className="flex flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <main className="flex-1 md:px-12 md:py-4 md:pb-0">{children}</main>
        </div>
      ) : (
        <main className="mx-auto max-w-screen-xl px-6 pt-2 pb-0">
          {children}
        </main>
      )}
    </>
  );
}
