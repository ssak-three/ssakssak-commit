import { JOB_ID_COOKIE_MAX_AGE } from "@/constants/cookie";

const getJobId = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const jobIdCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("jobId="),
  );
  return jobIdCookie ? jobIdCookie.split("=")[1] : null;
};

const setJobId = (
  jobId: string,
  maxAge: number = JOB_ID_COOKIE_MAX_AGE,
): void => {
  if (typeof document === "undefined") return;

  document.cookie = `jobId=${jobId}; path=/; max-age=${maxAge}`;
};

const removeJobId = (): void => {
  if (typeof document === "undefined") return;

  document.cookie = "jobId=; path=/; max-age=0";
};

export { getJobId, setJobId, removeJobId };
