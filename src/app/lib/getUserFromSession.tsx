import { cookies } from "next/headers";

export default async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("aichat_sess");

  if (!sessionCookie) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    headers: {
      Cookie: `aichat_sess=${sessionCookie.value}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data; // => { id, name }
}
