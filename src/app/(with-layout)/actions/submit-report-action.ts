"use server";

import {
  DATA_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { ReportFormState } from "@/types/report";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const submitReportAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<ReportFormState> => {
  try {
    const body = {
      reportTitle: String(formData.get("reportTitle") ?? "").trim(),
      repositoryOverview: String(
        formData.get("repositoryOverview") ?? "",
      ).trim(),
      repositoryUrl: String(formData.get("repositoryUrl") ?? "").trim(),
      branch: String(formData.get("branch") ?? "").trim(),
      reportHistoryId: formData.get("reportHistoryId")
        ? String(formData.get("reportHistoryId"))
        : null,
    };

    if (!body.repositoryUrl || !body.branch) {
      return {
        ok: false,
        formError: "리포지토리 URL과 브랜치를 모두 선택해 주세요.",
      };
    }

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: (await cookies()).toString(),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.error?.message ?? DATA_ERROR_MESSAGES.READ;
      return { ok: false, formError: message };
    }

    const jobId: string | undefined = result?.jobId;
    if (!jobId) {
      return { ok: false, formError: SYSTEM_ERROR_MESSAGES.UNKNOWN };
    }

    const cookieStore = await cookies();
    cookieStore.set("jobId", jobId, {
      path: "/loading",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 5,
    });
  } catch {
    return {
      ok: false,
      formError: DATA_ERROR_MESSAGES.READ,
    };
  }

  redirect("/loading");
};

export { submitReportAction };
