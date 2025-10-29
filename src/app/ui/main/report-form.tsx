"use client";

import { useActionState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import { useReportHistory } from "@/hooks/useVerifiedContext";
import { submitReportAction } from "@/app/(with-layout)/actions/submit-report-action";
import SubmitButton from "@/app/ui/main/submit-button";
import { ReportFormState } from "@/types/report";

function ReportForm() {
  const { selected } = useReportHistory();
  const [state, formAction] = useActionState<ReportFormState, FormData>(
    submitReportAction,
    undefined,
  );

  return (
    <form
      key={selected?.reportHistoryId ?? "empty"}
      action={formAction}
      className="mx-auto mb-14 flex w-full max-w-3xl flex-col gap-12 rounded-xl bg-white p-10 pt-20 pb-32"
    >
      <input
        type="hidden"
        name="reportHistoryId"
        value={selected?.reportHistoryId ?? ""}
      />

      <RepositoryBranchSelector />

      <InputField
        id="reportTitle"
        name="reportTitle"
        label="리포트 제목"
        placeholder="생성할 리포트 제목을 입력해 주세요."
        defaultValue={selected?.reportTitle ?? ""}
      />

      <div className="grid gap-3">
        <Label className="text-base font-medium text-neutral-800">
          리포지토리 개요
        </Label>
        <Textarea
          name="repositoryOverview"
          className="min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none"
          placeholder={`예시: 이 과제는 GitHub API를 활용해 저장소 브랜치와 커밋 내역을 조회하는 기능을 구현하는 과제입니다.\n예시: 주된 목적은 API 연동과 비동기 처리 역량을 확인하는 것입니다.`}
          defaultValue={selected?.repositoryOverview ?? ""}
        />
      </div>

      <div className="right-0 bottom-0 left-0 z-0 bg-white pt-5">
        <div className="mx-auto max-w-3xl">
          <SubmitButton />
          {state?.ok === false && state.formError && (
            <ErrorMessage
              className="pt-2 whitespace-normal"
              message={state.formError}
            />
          )}
        </div>
      </div>
    </form>
  );
}

export default ReportForm;
