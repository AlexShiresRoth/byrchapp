"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AnimatePresence>
      <div className="flex md:hidden">
        <button
          className="relative border-2 border-black px-2 py-1 font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
        {isOpen && (
          <motion.div className="absolute right-[2%] p-2 top-12 flex w-[150px] flex-col border-2 border-black bg-stone-100">
            <Link href="/" className="p-2">
              Home
            </Link>
            <Link href="/about" className="p-2">
              About
            </Link>
            <Link href="http://app.dev.com:3000" className="p-2">
              Login
            </Link>
            <Link href="http://app.dev.com:3000" className="p-2">
              Signup
            </Link>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default MobileMenu;
