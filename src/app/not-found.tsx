"use client";

import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

// 404페이지도 usestate 사용 가능하게 설정해야함. 네비바가 ssr로 로드되어야하는데 현재, 404페이지에선 매번 fetch함.
export default function NotFoundPage() {
  return (
    <main
      className="p-8 mt-[72px] bg-[#343A40] flex flex-col items-center justify-center mt-[72px] min-h-[calc(100dvh-72px)] font-semibold"
      style={{ fontFamily: '"Spoqa Han Sans Neo", sans-serif' }}
    >
      <h2 className="text-4xl mb-7">404 - This page could not be found</h2>
      <p>
        <Link
          href="/"
          className="text-2xl no-underline hover:underline text-[#facc15]"
        >
          Go home →
        </Link>
      </p>
    </main>
  );
}
