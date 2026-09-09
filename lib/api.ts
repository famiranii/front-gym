const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type RequestOptions = RequestInit & {
  cookie?: string;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { cookie, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  if (
    !(fetchOptions.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  // SSR: cookie را از request کاربر به backend forward می‌کنیم
  if (cookie) {
    headers.set("Cookie", cookie);
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      error.message ||
        error.error ||
        `Request failed with status ${res.status}`,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  get: <T>(url: string, cookie?: string) =>
    request<T>(url, {
      method: "GET",
      cookie,
    }),

  post: <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    cookie?: string,
  ) =>
    request<T>(url, {
      method: "POST",
      cookie,
      body:
        data instanceof FormData
          ? data
          : data
            ? JSON.stringify(data)
            : undefined,
    }),

  put: <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    cookie?: string,
  ) =>
    request<T>(url, {
      method: "PUT",
      cookie,
      body:
        data instanceof FormData
          ? data
          : data
            ? JSON.stringify(data)
            : undefined,
    }),

  patch: <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    cookie?: string,
  ) =>
    request<T>(url, {
      method: "PATCH",
      cookie,
      body:
        data instanceof FormData
          ? data
          : data
            ? JSON.stringify(data)
            : undefined,
    }),

  delete: <T>(url: string, cookie?: string) =>
    request<T>(url, {
      method: "DELETE",
      cookie,
    }),
};