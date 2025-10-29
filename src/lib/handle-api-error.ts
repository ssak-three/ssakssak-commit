import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function handleApiError(
  router: AppRouterInstance,
  status: number,
  message: string,
) {
  if (status === 401) {
    router.replace("/auth/error");
    return;
  }

  if (status === 404) {
    router.replace("/not-found");
    return;
  }

  if (status === 422 || status === 500 || status === 502) {
    router.replace(
      `/error?status=${status}&message=${encodeURIComponent(message)}`,
    );
    return;
  }

  router.replace("/");
}

export default handleApiError;
