"use client";

import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

export default function NotFoundPage() {
  const { user } = useUser();
  return (
    <main
      className="p-8 mt-[72px] bg-[#343A40] flex flex-col items-center justify-center mt-[72px] min-h-[calc(100dvh-72px)] font-semibold"
      style={{ fontFamily: '"Spoqa Han Sans Neo", sans-serif' }}
    >
      <h2 className="text-4xl mb-7">
        {user?.id}404 - This page could not be found
      </h2>
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
