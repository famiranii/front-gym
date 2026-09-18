export function getImageUrl(path?: string | null) {
  if (!path) return "";

  // اگر از قبل URL کامل است
  if (path.startsWith("http://") || path.startsWith("https://")) {
    // URL داخلی Docker را برای Browser به URL عمومی تبدیل کن
    if (path.startsWith("http://backend:8080")) {
      return path.replace(
        "http://backend:8080",
        process.env.NEXT_PUBLIC_API_URL || "",
      );
    }

    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return path;
  }

  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}