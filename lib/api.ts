const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,

    // خیلی مهم:
    // باعث می‌شود browser cookieهای HttpOnly را
    // همراه request به backend بفرستد.
    credentials: "include",

    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(error.message || error.error || "Request failed");
  }

  // PATCH / DELETE که 204 می‌دهند
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) =>
    request<T>(url, {
      method: "GET",
    }),

  post: <T>(url: string, data?: Record<string, unknown> | FormData) =>
    request<T>(url, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  put: <T>(url: string, data?: Record<string, unknown> | FormData) =>
    request<T>(url, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  patch: <T>(url: string, data?: Record<string, unknown> | FormData) =>
    request<T>(url, {
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),
};
