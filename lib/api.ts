function getBaseUrl() {
  if (typeof window === "undefined") {
    const url = process.env.INTERNAL_API_URL;

    if (!url) {
      throw new Error("INTERNAL_API_URL is not defined");
    }

    return url;
  }

  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  return url;
}

type RequestOptions = RequestInit & {
  cookie?: string;
  skipAuthRedirect?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  if (!refreshPromise) {
    refreshPromise = fetch(`${getBaseUrl()}/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { cookie, skipAuthRedirect, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  if (
    !(fetchOptions.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (cookie) {
    headers.set("Cookie", cookie);
  }

  const res = await fetch(`${getBaseUrl()}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (res.status === 401) {
    console.log("API 401:", endpoint, await res.clone().text());
    if (
      typeof window !== "undefined" &&
      !skipAuthRedirect &&
      endpoint !== "/refresh"
    ) {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        return request<T>(endpoint, options);
      }

      // window.location.href = "/login";
    }

    const error = await res.json().catch(() => ({}));

    throw new Error(error.message || error.error || "Unauthorized");
  }

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
  get: <T>(url: string, cookie?: string, skipAuthRedirect = false) =>
    request<T>(url, {
      method: "GET",
      cookie,
      skipAuthRedirect,
    }),

  post: <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    cookie?: string,
    skipAuthRedirect = false,
  ) =>
    request<T>(url, {
      method: "POST",
      cookie,
      skipAuthRedirect,
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
    skipAuthRedirect = false,
  ) =>
    request<T>(url, {
      method: "PUT",
      cookie,
      skipAuthRedirect,
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
    skipAuthRedirect = false,
  ) =>
    request<T>(url, {
      method: "PATCH",
      cookie,
      skipAuthRedirect,
      body:
        data instanceof FormData
          ? data
          : data
            ? JSON.stringify(data)
            : undefined,
    }),

  delete: <T>(url: string, cookie?: string, skipAuthRedirect = false) =>
    request<T>(url, {
      method: "DELETE",
      cookie,
      skipAuthRedirect,
    }),
};
