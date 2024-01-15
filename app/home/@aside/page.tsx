import H1 from "@/components/heading/H1";
import Link from "next/link";

const page = () => {
  return (
    <section className="relative flex h-full flex-[.40] flex-col justify-center bg-amber-400 p-8">
      <div className="absolute left-0 top-10 flex w-full items-center gap-4  px-8 py-4 font-semibold">
        <Link href={"/login"}>Login</Link>
        <Link href={"/signup"}>Signup</Link>
      </div>
      <div className="flex flex-col gap-4 ">
        <H1>Welcome to Byrch.app</H1>
        <p className="text-xl text-stone-700">
          Discover & create things that interest you
        </p>
      </div>
      <div className="my-8 flex gap-4">
        <Link
          href="/signup"
          className="bg-black px-6 py-4 font-semibold text-white"
        >
          Get Started
        </Link>
        <Link
          href="/main-feed"
          className="border-b-2 border-b-black px-6 py-4 font-semibold"
        >
          View Articles
        </Link>
      </div>
    </section>
  );
};

export default page;
