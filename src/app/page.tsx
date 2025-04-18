"use client";

import { useEffect, useState } from "react";
import { APIResponse } from "@/types/api";
import { fetchWithCsrf } from "@/app/components/CsrfToken";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await fetchWithCsrf(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/get-characters`,
          {
            method: "GET",
            credentials: "include",
            skipCsrf: true,
          }
        );

        if (res.ok) {
          const json = (await res.json()) as APIResponse<object>;
          console.log(json.data);
        } else {
          const json = (await res.json()) as APIResponse<object>;
          console.log(json.message);
        }
      } catch {
        console.log("서버와의 연결에 실패했습니다");
      }
    };
    getCharacters();
  }, []);

  return <main className="p-8 mt-[72px] bg-[#343A40]">{message}</main>;
}
