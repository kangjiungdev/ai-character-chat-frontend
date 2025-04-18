"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

export default function NavBar() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#1F2327] z-[1000]">
      <nav className="w-full h-[72px] flex items-center bg-[#1F2327]">
        <div
          className={`grid grid-cols-${
            !user ? "3" : "4"
          } w-full text-white text-base`}
        >
          <div className="flex justify-center items-center w-full h-full">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </div>
          {user ? (
            <>
              <div className="flex justify-center items-center w-full h-full">
                <Link href="/chat" className="hover:underline">
                  대화
                </Link>
              </div>
              <div className="flex justify-center items-center w-full h-full">
                <Link href="/create-character" className="hover:underline">
                  캐릭터 생성
                </Link>
              </div>
              <div
                id="user-avatar-btn"
                className="flex justify-center items-center w-full h-full gap-5"
              >
                <Link href={`user/${user}`} className="hover:underline">
                  {user}
                </Link>
                <button
                  id="logout-btn"
                  type="submit"
                  className="hover:underline cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center w-full h-full">
                <Link href="/login" className="hover:underline">
                  Log in
                </Link>
              </div>
              <div className="flex justify-center items-center w-full h-full">
                <Link href="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
