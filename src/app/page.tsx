"use client";

import { useEffect, useState } from "react";
import { APIResponse } from "@/types/api";
import { fetchWithCsrf } from "./components/CsrfToken";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await fetchWithCsrf(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/get-characters`,
          {
            method: "POST",
            credentials: "include",
            skipCsrf: true,
          }
        );

        if (res.ok) {
          const json = (await res.json()) as APIResponse<{
            message: string;
            data: string;
          }>;
          console.log(json.data.data);
        } else {
          const json = (await res.json()) as APIResponse<{ message: string }>;
          console.log(json.data.message);
        }
      } catch {
        console.log("서버와의 연결에 실패했습니다");
      }
    };
    getCharacters();
  }, []);

  return <main className="p-8 mt-[72px] bg-[#343A40]">{message}</main>;
}
