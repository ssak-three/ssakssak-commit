"use client";

import { useActionState, useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import { submitReportAction } from "@/app/(with-layout)/actions/submit-report-action";
import SubmitButton from "@/app/ui/main/submit-button";
import { ReportFormState } from "@/types/report";
import { InfoTooltip } from "@/app/ui/common/tooltip";
import { REPORT_INPUT } from "@/constants/validations";
import { VALIDATION_ERROR_MESSAGES } from "@/constants/error-messages";

function ReportForm() {
  const [state, formAction] = useActionState<ReportFormState, FormData>(
    submitReportAction,
    undefined,
  );
  const [reportTitle, setReportTitle] = useState("");
  const [reportTitleError, setReportTitleError] = useState<string | null>(null);
  const [reportOverviewError, setReportOverviewError] = useState<string | null>(
    null,
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const reportTitle = String(formData.get("reportTitle") ?? "").trim();
    const repositoryOverview = String(
      formData.get("repositoryOverview") ?? "",
    ).trim();

    if (reportTitle.length > REPORT_INPUT.TITLE_MAX_LENGTH) {
      e.preventDefault();
      setReportTitleError(
        VALIDATION_ERROR_MESSAGES.REPORT_INPUT.TITLE_MAX_LENGTH,
      );
      return;
    }

    if (repositoryOverview.length > REPORT_INPUT.OVERVIEW_MAX_LENGTH) {
      e.preventDefault();
      setReportOverviewError(
        VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_OVERVIEW_MAX_LENGTH,
      );
      return;
    }

    setReportTitleError(null);
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="mx-auto mb-14 flex w-full max-w-3xl flex-col gap-12 rounded-xl bg-white p-10 pt-20 pb-32"
    >
      <RepositoryBranchSelector />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Label htmlFor="reportTitle">리포트 제목</Label>
            <InfoTooltip
              content={
                <>
                  분석할 리포트를 구분할 수 있는 제목을 입력해 주세요.
                  <br />
                  리포트 목록에서 식별하기 쉬운 이름을 권장합니다.
                </>
              }
            />
          </div>
          <span
            className={`text-sm ${
              reportTitle.length > REPORT_INPUT.TITLE_MAX_LENGTH
                ? "text-red-500"
                : "text-neutral-400"
            }`}
          >
            {reportTitle.length} / {REPORT_INPUT.TITLE_MAX_LENGTH}
          </span>
        </div>

        <InputField
          id="reportTitle"
          name="reportTitle"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          placeholder="생성할 리포트 제목을 입력해 주세요."
          className={`rounded-lg border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-100 focus:outline-none ${
            reportTitleError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-neutral-300 focus:border-sky-400"
          }`}
        />

        {reportTitleError && <ErrorMessage message={reportTitleError} />}
      </div>

      <div className="grid gap-3">
        <div className="flex items-center gap-1">
          <Label className="text-base font-medium text-neutral-800">
            리포지토리 개요
          </Label>

          <InfoTooltip
            content={
              <>
                리포지토리의 목적, 과제 의도, 어떤 기능을 검증하는지 등
                <br />
                분석에 도움이 될 만한 배경 정보를 작성해 주세요.
              </>
            }
          />
        </div>

        <Textarea
          name="repositoryOverview"
          className={`min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none ${
            reportOverviewError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-neutral-300 focus:border-sky-400"
          }`}
          placeholder={`예시: 이 과제는 GitHub API를 활용해 저장소 브랜치와 커밋 내역을 조회하는 기능을 구현하는 과제입니다.\n예시: 주된 목적은 API 연동과 비동기 처리 역량을 확인하는 것입니다.`}
        />

        {reportOverviewError && <ErrorMessage message={reportOverviewError} />}
      </div>

      <div className="right-0 bottom-0 left-0 z-0 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-2">
          <SubmitButton />
          {state?.ok === false && state.formError && (
            <ErrorMessage message={state.formError} />
          )}
        </div>
      </div>
    </form>
  );
}

export default ReportForm;
