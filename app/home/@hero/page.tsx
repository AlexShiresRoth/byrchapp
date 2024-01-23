import BackgroundShapes from "@/components/art/background-shapes";
import FlyingCar, { FlyingCar2 } from "@/components/art/flying-car";
import H1 from "@/components/heading/H1";
import Link from "next/link";

const page = () => {
  return (
    <section className="relative flex w-full flex-grow flex-col items-center justify-center bg-amber-400 pb-12 pt-16">
      <div className="relative z-20 flex w-3/4 justify-between py-16">
        <div className="relative z-10 w-2/3 ">
          <div className="relative z-10 border-2 border-black bg-amber-400 p-8">
            <div className="flex w-full flex-col gap-4">
              <H1>
                <span className="-ml-2 uppercase">Welcome to Byrch.app</span>
              </H1>
              <p className="text-xl text-stone-900">
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
        </div>
      </div>
      <FlyingCar />
      <FlyingCar2 />
      <BackgroundShapes />
    </section>
  );
};

export default page;
