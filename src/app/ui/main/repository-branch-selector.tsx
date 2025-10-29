"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/ui/common/button";
import { Input } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import ErrorMessage from "@/app/ui/common/error-message";
import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";
import {
  GITHUB_REPOSITORY_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { BranchList } from "@/types/branch";
import ComboboxPopover from "@/app/ui/common/combobox";
import { useReportHistory } from "@/hooks/useVerifiedContext";

function RepositoryBranchSelector() {
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [branches, setBranches] = useState<BranchList[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { selected } = useReportHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRepositoryUrl(selected?.repositoryUrl ?? "");
    setBranches([]);
    setSelectedBranch(null);
  }, [selected]);

  const isValidRepositoryUrl = (url: string) => {
    return GITHUB_REPOSITORY_RULES.REPOSITORY_REGEX.test(url);
  };

  const handleFetchedBranches = async () => {
    setError(null);
    if (!isValidRepositoryUrl(repositoryUrl.trim())) {
      setError(GITHUB_REPOSITORY_ERROR_MESSAGES.INVALID_URL);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/branches?repositoryUrl=${repositoryUrl}`,
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage: string | undefined = data?.error?.message;
        setError(errorMessage ?? SYSTEM_ERROR_MESSAGES.SERVER);
        return;
      }

      const branchListOption = data.branches.map((branchName: string) => ({
        id: branchName,
        value: branchName,
      }));

      setBranches(branchListOption);
    } catch {
      setError(SYSTEM_ERROR_MESSAGES.NETWORK);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid w-full gap-4">
      <div className="flex items-center justify-between gap-3">
        <Label>리포지토리 URL</Label>
        <Button
          onClick={handleFetchedBranches}
          type="button"
          disabled={loading}
          className="rounded-md border border-neutral-300 bg-neutral-900 px-3 py-1.5 font-medium text-neutral-700 text-white hover:bg-neutral-600 disabled:opacity-50"
        >
          {loading ? "조회 중..." : "브랜치 조회"}
        </Button>
      </div>

      <Input
        required
        value={repositoryUrl}
        onChange={(e) => {
          setRepositoryUrl(e.target.value);
          setBranches([]);
          setSelectedBranch(null);
          setError(null);
        }}
        placeholder="https://github.com/{리포지토리 소유자}/{리포지토리 이름}"
        className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none"
      />

      <div className="flex h-[30px] items-center">
        {error ? (
          <ErrorMessage
            className="pt-5 whitespace-pre-wrap"
            message={String(error)}
          />
        ) : branches.length > 0 ? (
          <ComboboxPopover
            items={branches}
            value={selectedBranch}
            onValueChange={setSelectedBranch}
          >
            브랜치
          </ComboboxPopover>
        ) : null}
      </div>

      <input type="hidden" name="repositoryUrl" value={repositoryUrl}></input>
      <input type="hidden" name="branch" value={selectedBranch ?? ""}></input>
    </div>
  );
}

export default RepositoryBranchSelector;
