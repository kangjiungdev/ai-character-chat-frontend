"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchWithCsrf } from "@/app/components/CsrfToken";

type User = string | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User;
}) {
  const [user, setUser] = useState<User>(initialUser);
  const [fetched, setFetched] = useState(false); // ✅ 중복 fetch 방지

  useEffect(() => {
    // ✅ 1. 이미 유저가 있으면 fetch 안 함
    if (user || fetched) return;

    // ✅ 2. 세션 쿠키 없으면 fetch 안 함
    const hasSession = document.cookie.includes("aichat_sess=");
    if (!hasSession) return;

    const fetchUser = async () => {
      try {
        const res = await fetchWithCsrf(
          `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const json = await res.json();
          setUser(json.data);
        }
      } catch (e) {
        console.error("세션 확인 실패:", e);
      } finally {
        setFetched(true); // ✅ fetch 완료됨
      }
    };

    fetchUser();
  }, [user, fetched]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
