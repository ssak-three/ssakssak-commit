class CookieUtils {
  getJobId(): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    const jobIdCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("jobId="),
    );
    return jobIdCookie ? jobIdCookie.split("=")[1] : null;
  }

  setJobId(jobId: string, maxAge: number = 3600): void {
    if (typeof document === "undefined") return;

    document.cookie = `jobId=${jobId}; path=/; max-age=${maxAge}`;
  }

  removeJobId(): void {
    if (typeof document === "undefined") return;

    document.cookie = "jobId=; path=/; max-age=0";
  }
}

export const cookieUtils = new CookieUtils();
