import Link from "next/link";

const page = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full justify-between bg-stone-100 p-4">
      <div>
        <Link href="/" className="text-xl font-bold text-stone-600">
          Byrch.app
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/login" className="text-stone-600">
          Login
        </Link>
        <Link href="/signup" className="text-stone-600">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default page;
