import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { headers } from "next/headers";

const Nav = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full justify-center border-b-2 border-b-black bg-stone-100 py-4">
      <div className="flex w-11/12 items-center justify-between md:w-3/4">
        <Link href="/" className="text-xl font-bold text-stone-900">
          Byrch.app
        </Link>
        <Menu />
      </div>
    </nav>
  );
};

const Menu = () => {
  const headersList = headers();
  const domain = headersList.get("host");
  const prefixedDomain = `${
    process.env.DEV_MODE === "yes" ? "http://" : "https://"
  }app.${domain}`;

  return (
    <>
      <div className="hidden items-center gap-14 font-semibold md:flex">
        <Link href={"/"} className="font-extrabold">
          Home
        </Link>
        <Link href="/about">About</Link>
        <a href={prefixedDomain}>Login</a>
        <Link href={"/signup"}>Signup</Link>
      </div>
      <MobileMenu />
    </>
  );
};

export default Nav;
