"use client";

import { useEffect, useState } from "react";
import { APIResponse } from "@/types/api";
import { fetchWithCsrf } from "@/app/components/CsrfToken";

export default function CreateCharacter() {
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  return <main className="p-8 mt-[72px] bg-[#343A40]">{message}</main>;
}
