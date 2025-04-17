"use client";
import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1F2327] z-[1000]">
      <nav className="w-full h-[72px] flex items-center bg-[#1F2327]">
        <div className="grid grid-cols-3 w-full text-white text-base">
          <div className="flex justify-center items-center w-full h-full">
            <Link href="/" className="hover:underline py-2">
              Home
            </Link>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Link href="/login" className="hover:underline py-2">
              Log in
            </Link>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Link href="/signup" className="hover:underline py-2">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
