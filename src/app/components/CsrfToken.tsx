async function fetchCsrfToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  return json.data.csrf_token;
}

type FetchWithCsrfOptions = RequestInit & { skipCsrf?: boolean };

export async function fetchWithCsrf(
  input: RequestInfo | URL,
  options: FetchWithCsrfOptions = {}
) {
  const { skipCsrf = false, headers = {}, ...rest } = options;

  let csrfToken: string | undefined;
  if (!skipCsrf) {
    csrfToken = await fetchCsrfToken();
  }

  return fetch(input, {
    ...rest,
    credentials: "include",
    headers: {
      ...headers,
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
      Accept: "application/json",
    },
  });
}
