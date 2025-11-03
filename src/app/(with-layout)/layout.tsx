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
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <main className="flex-1 md:overflow-y-auto md:p-12">{children}</main>
        </div>
      ) : (
        <div className="min-h-screen">
          <main className="mx-auto max-w-screen-xl p-6">{children}</main>
        </div>
      )}
    </>
  );
}
