import { Suspense } from "react";
import LoginButton from "./login-button";

export default async function LoginPage() {
  return (
    <div className="relative mx-5 bg-amber-400 py-10 sm:mx-auto  sm:w-full sm:max-w-md md:border-2 md:border-black md:shadow-[10px_10px_0_0_black]">
      <h1 className="mt-6 text-center font-cal text-3xl font-bold dark:text-white">
        Byrch.app
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        A simple blog platform.
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton provider="google" />
        </Suspense>

        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton provider="github" />
        </Suspense>
      </div>
    </div>
  );
}
