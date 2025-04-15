"use client";

import { useEffect, useState } from "react";
import { APIResponse } from "@/types/api";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-characters`,
          {
            method: "POST",
          }
        );
        const json = (await res.json()) as APIResponse<{ status: string }>;
        setMessage(json.data.status);
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchMessage();
  }, []);

  return <main className="p-8 mt-[72px] bg-[#343A40]">{message}</main>;
}
