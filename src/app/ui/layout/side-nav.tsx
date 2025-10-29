import NavLinks from "@/app/ui/layout/sections/nav/nav-links";
import {
  SignInButton,
  SignOutButton,
} from "@/app/ui/layout/sections/nav/sign-buttons";

type Props = {
  isLoggedIn: boolean;
};

function SideNav({ isLoggedIn }: Props) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        {isLoggedIn ? (
          <>
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
            <SignOutButton />
          </>
        ) : (
          <>
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
            <SignInButton
              className={
                "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm hover:bg-purple-100 hover:text-purple-800 md:flex-none md:justify-start md:p-2 md:px-3"
              }
            ></SignInButton>
          </>
        )}
      </div>
    </div>
  );
}

export default SideNav;
