import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkParams = {
  href: string;
  label: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({ href, label, children, ...props }: NavLinkParams) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      {...props}
      className={clsx(
        "flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-gray-50 px-3 text-lg text-slate-700 transition md:flex-none md:justify-start",
        "hover:bg-purple-100 hover:text-purple-800",
        currentPath === href && "bg-purple-50 text-slate-900",
      )}
    >
      {children} <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

export default NavLink;
