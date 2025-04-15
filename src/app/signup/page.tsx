"use client";

import { useEffect } from "react";
import { APIResponse } from "@/types/api";

export default function Home() {
  useEffect(() => {
    const form = document.getElementById("signup-form") as HTMLFormElement;
    const userIdInput = document.getElementById("user-id") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const passwordCheckInput = document.getElementById(
      "password-check"
    ) as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const phoneInput = document.getElementById(
      "phone-number"
    ) as HTMLInputElement;
    const birthDateInput = document.getElementById(
      "birth-date"
    ) as HTMLInputElement;

    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });

    function restrictInput(input: HTMLInputElement, pattern: RegExp) {
      input.addEventListener("input", () => {
        input.value = input.value.replace(pattern, "");
      });
    }

    function trimValue(input: HTMLInputElement) {
      return input.value.trim();
    }

    function createErrorMessage(message: string) {
      const existing = document.getElementById("error-msg");
      if (existing) existing.remove();

      const p = document.createElement("p");
      p.id = "error-msg";
      p.textContent = message;
      p.style.color = "#f87171";
      p.classList.add("mt-5");
      form.appendChild(p);
      form.style.paddingBottom = "20px";
    }

    // 입력 제한
    restrictInput(userIdInput, /\s|[^a-zA-Z0-9]/g);
    restrictInput(passwordInput, /\s|[^a-zA-Z0-9]/g);
    restrictInput(passwordCheckInput, /\s|[^a-zA-Z0-9]/g);

    // 전화번호 숫자만 입력 허용
    phoneInput.addEventListener("keydown", (e) => {
      const key = e.key;
      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
      if (!/\d/.test(key) && !allowed.includes(key)) {
        e.preventDefault();
      }
    });

    phoneInput.addEventListener("input", () => {
      const numbers = phoneInput.value.replace(/\D/g, "");
      if (numbers.length <= 3) {
        phoneInput.value = numbers;
      } else if (numbers.length <= 7) {
        phoneInput.value = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        phoneInput.value = `${numbers.slice(0, 3)}-${numbers.slice(
          3,
          7
        )}-${numbers.slice(7, 11)}`;
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userId = trimValue(userIdInput);
      if (userId.length < 6 || userId.length > 15) {
        createErrorMessage("아이디는 6자~15자여야 합니다");
        return;
      }

      const pw = trimValue(passwordInput);
      if (pw.length < 8 || pw.length > 20) {
        createErrorMessage("비밀번호는 8자~20자여야 합니다");
        return;
      }
      if (pw !== passwordCheckInput.value) {
        createErrorMessage("비밀번호가 일치하지 않습니다");
        return;
      }

      const name = trimValue(nameInput);
      if (!name) {
        createErrorMessage("이름을 입력해 주세요");
        return;
      }
      if (name.length > 15) {
        createErrorMessage("이름은 15자 이하(좌우 공백 제외)여야 합니다");
        return;
      }

      if (trimValue(phoneInput).length !== 13) {
        createErrorMessage("전화번호 형식이 올바르지 않습니다");
        return;
      }

      if (!birthDateInput.value || !birthDateInput.checkValidity()) {
        createErrorMessage("생년월일 형식이 올바르지 않습니다");
        return;
      }

      nameInput.value = name;

      const formData = new FormData(form);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (res.ok) {
          window.location.href = "/";
          return;
        } else {
          const json = (await res.json()) as APIResponse<{
            message: string;
          }>;
          createErrorMessage(json.data.message);
        }
      } catch {
        createErrorMessage("서버와의 연결에 실패했습니다");
      }
    });
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const hundredYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100)
  )
    .toISOString()
    .split("T")[0];
  return (
    <main className="flex items-center justify-center mt-[72px] min-h-[calc(100dvh-72px)] bg-[#343A40] p-8">
      <form
        action="/signup"
        method="POST"
        id="signup-form"
        className="bg-[#2a2b2f] text-white p-8 rounded-2xl w-[30vw] mt-4 mb-5 shadow-[0_0_12px_rgba(0,0,0,0.6)]"
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

        {/* 비밀번호 확인 */}
        <div className="mb-6">
          <label htmlFor="password-check" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">비밀번호 확인</p>
            <input
              type="password"
              id="password-check"
              name="password-check"
              maxLength={20}
              placeholder="비밀번호 재입력"
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 이름 */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">이름</p>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={15}
              placeholder="이름을 입력해 주세요."
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 전화번호 */}
        <div className="mb-6">
          <label htmlFor="phone-number" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">전화번호</p>
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              maxLength={13}
              placeholder="전화번호 입력"
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 생년월일 */}
        <div className="mb-6">
          <label htmlFor="birth-date" className="block mb-6">
            <p className="mb-2 text-sm text-[#ccc]">생년월일</p>
            <input
              type="date"
              id="birth-date"
              name="birth-date"
              min={hundredYearsAgo}
              max={today}
              className="w-full px-4 py-3 rounded-md border border-[#555] bg-[#3a3b3f] text-white placeholder-[#888] focus:outline-none focus:border-[#555]"
            />
          </label>
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full py-3 bg-[#facc15] text-black rounded-md font-bold text-lg mt-4 hover:bg-[#eab308] transition-colors duration-200"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
