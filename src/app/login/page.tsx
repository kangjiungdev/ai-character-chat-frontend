"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { APIResponse } from "@/types/api";
import GlobalDomEffect from "@/app/components/GlobalDomEffect";
import { fetchWithCsrf } from "@/app/components/CsrfToken";
import { useUser } from "@/app/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const trimValue = (input: HTMLInputElement) => input.value.trim();

  const createErrorMessage = (message: string) => {
    const form = formRef.current;
    if (!form) return;

    const existing = document.getElementById("error-msg");
    if (existing) existing.remove();

    const p = document.createElement("p");
    p.id = "error-msg";
    p.textContent = message;
    p.style.color = "#f87171";
    p.classList.add("mt-5");
    form.appendChild(p);
    form.style.paddingBottom = "20px";
  };

  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const regex = GlobalDomEffect.EngAndNumberOnly;

    const userIdInput = document.getElementById("user-id") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    const userId = trimValue(userIdInput);
    if (userId.length < 6 || userId.length > 15) {
      createErrorMessage("아이디는 6자~15자여야 합니다");
      return;
    }
    if (regex.test(userId)) {
      createErrorMessage("아이디는 영문자와 숫자만 입력 가능합니다");
      return;
    }

    const pw = trimValue(passwordInput);
    if (pw.length < 8 || pw.length > 20) {
      createErrorMessage("비밀번호는 8자~20자여야 합니다");
      return;
    }
    if (regex.test(passwordInput.value)) {
      createErrorMessage("비밀번호는 영문자와 숫자만 입력 가능합니다");
      return;
    }

    const formData = new FormData(form);

    try {
      const res = await fetchWithCsrf(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        const json = await res.json();
        setUser(json.data);
        router.push("/");
      } else {
        const json = (await res.json()) as APIResponse<object>;
        createErrorMessage(json.message);
      }
    } catch {
      createErrorMessage("서버와의 연결에 실패했습니다");
    }
  };

  useEffect(() => {
    GlobalDomEffect.allInputAutoCompleteOff();
  }, []);

  return (
    <main className="flex items-center justify-center mt-[72px] min-h-[calc(100dvh-72px)] bg-[#343A40] p-8">
      <form
        id="signup-form"
        ref={formRef}
        className="bg-[#2a2b2f] text-white p-8 rounded-2xl w-[20vw] mt-4 mb-5 shadow-[0_0_12px_rgba(0,0,0,0.6)]"
        onSubmit={handleSubmit}
      >
        {/* 아이디 */}
        <div className="mb-6">
          <label htmlFor="user-id" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">아이디</p>
            <input
              type="text"
              id="user-id"
              name="user-id"
              maxLength={15}
              lang="en"
              placeholder="아이디 입력(6~15자)"
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 비밀번호 */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">비밀번호</p>
            <input
              type="password"
              id="password"
              name="password"
              maxLength={20}
              placeholder="비밀번호 입력(8자~20자)"
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full py-3 bg-[#facc15] text-black rounded-md font-bold text-lg mt-4 hover:bg-[#eab308] transition-colors duration-200 cursor-pointer"
        >
          Log In
        </button>
      </form>
    </main>
  );
}
