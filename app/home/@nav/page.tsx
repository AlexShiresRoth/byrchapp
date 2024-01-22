import Link from "next/link";

const page = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full justify-center border-b-2 border-b-black bg-stone-100 py-4">
      <div className="flex w-3/4 justify-between">
        <Link href="/" className="text-xl font-bold text-stone-900">
          Byrch.app
        </Link>
        <div className="flex items-center gap-14 font-semibold">
          <Link href={"/"} className="font-extrabold">
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default page;
