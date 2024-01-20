import H1 from "@/components/heading/H1";
import Link from "next/link";

const page = () => {
  return (
    <section className="flex w-full flex-grow flex-col items-center justify-center bg-amber-400 py-12">
      <div className="flex w-3/4 flex-col py-8">
        <div className="flex w-full items-center gap-8 py-4 font-semibold">
          <Link href={"/"} className="font-extrabold">
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Signup</Link>
        </div>
        <div className="flex w-full flex-col gap-4">
          <H1>Welcome to Byrch.app</H1>
          <p className="text-xl text-stone-700">
            Discover & create things that interest you
          </p>
        </div>
        <div className="my-8 flex gap-4">
          <Link
            href="/signup"
            className="flex border-2 border-black bg-emerald-500 px-6 py-4 text-lg font-semibold text-black shadow-[5px_5px_0_0_black] transition-all hover:shadow-[0px_0px_0_0_black]"
          >
            Get Started
          </Link>
          <Link
            href="/main-feed"
            className="border-b-2 border-b-black px-6 py-4 text-lg font-semibold"
          >
            View Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
