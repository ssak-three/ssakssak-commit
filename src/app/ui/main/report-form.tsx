"use client";

import { useEffect, useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { Button } from "@/app/ui/common/button";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import {
  SYSTEM_ERROR_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { useRouter } from "next/navigation";
import { useReportHistory } from "@/hooks/useVerifiedContext";
import handleApiError from "@/lib/handle-api-error";
import { AlertModal } from "@/app/ui/common/Modal";

function ReportForm() {
  const router = useRouter();
  const { selected } = useReportHistory();
  const [reportTitle, setReportTitle] = useState<string>("");
  const [repositoryOverview, setRepositoryOverview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [badRequestMessage, setBadRequestMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const syncedTitle = selected?.reportTitle ?? "";
    const syncedOverview = selected?.repositoryOverview ?? "";

    setReportTitle(syncedTitle);
    setRepositoryOverview(syncedOverview);
  }, [selected]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (badRequestMessage) return;

    try {
      setErrorText(null);
      setIsSubmitting(true);

      const formData = new FormData(e.currentTarget);

      const data = {
        reportTitle: String(formData.get("reportTitle") || "").trim(),
        repositoryOverview: String(
          formData.get("repositoryOverview") || "",
        ).trim(),
        repositoryUrl: String(formData.get("repositoryUrl") || "").trim(),
        branch: String(formData.get("branch") || "").trim(),
        reportHistoryId: selected?.reportHistoryId ?? null,
      };

      if (data.reportTitle.length > 20) {
        setBadRequestMessage(
          VALIDATION_ERROR_MESSAGES.REPORT_INPUT.TITLE_MAX_LENGTH,
        );
        return;
      }

      if (data.repositoryOverview.length > 1000) {
        setBadRequestMessage(
          VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_OVERVIEW_MAX_LENGTH,
        );
        return;
      }

      if (!data.repositoryUrl || !data.branch) {
        setErrorText("리포지토리 URL과 브랜치를 모두 선택해 주세요.");
        setIsSubmitting(false);
        return;
      }

      router.push("/loading");

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resultData = await response.json();
      const status = response.status;
      const responseError =
        resultData?.error?.message ?? "요청에 실패했습니다.";

      if (!response.ok) {
        setIsSubmitting(false);
        handleApiError(router, status, responseError);
        return;
      }

      const { result } = resultData;
      const id = crypto.randomUUID();
      sessionStorage.setItem(`guest:report:${id}`, JSON.stringify(result));

      router.replace(`/report-view/${id}`);
    } catch {
      setErrorText(SYSTEM_ERROR_MESSAGES.NETWORK);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-14 flex w-full max-w-3xl flex-col gap-12 rounded-xl bg-white p-10 pt-20 pb-32"
    >
      <fieldset disabled={isSubmitting} className="contents">
        <RepositoryBranchSelector />

        <InputField
          id="reportTitle"
          name={"reportTitle"}
          label={"리포트명"}
          placeholder={"생성할 리포트명을 입력해 주세요."}
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
        />
        <div className="grid gap-3">
          <Label className="text-base font-medium text-neutral-800">
            리포지토리 개요
          </Label>
          <Textarea
            value={repositoryOverview}
            name="repositoryOverview"
            className="min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none"
            placeholder={`예시: 이 과제는 GitHub API를 활용해 저장소 브랜치와 커밋 내역을 조회하는 기능을 구현하는 과제입니다.\n예시: 주된 목적은 API 연동과 비동기 처리 역량을 확인하는 것입니다.`}
            onChange={(e) => setRepositoryOverview(e.target.value)}
          />
        </div>

        <div className="right-0 bottom-0 left-0 z-0 bg-white pt-5">
          <div className="mx-auto max-w-3xl">
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-neutral-900 text-base font-semibold text-white shadow-sm hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? "리포트 생성 요청 중..." : "리포트 생성"}
            </Button>

            {errorText && (
              <ErrorMessage
                className="pt-2 whitespace-normal"
                message={errorText}
              />
            )}
          </div>
        </div>
      </fieldset>

      <AlertModal
        open={!!badRequestMessage}
        title="입력을 수정해 주세요!"
        description={badRequestMessage || SYSTEM_ERROR_MESSAGES.NETWORK}
        cancelLabel="닫기"
        onCancel={() => {
          setBadRequestMessage(null);
          setIsSubmitting(false);
        }}
      />
    </form>
  );
}

export default ReportForm;
