import { BranchName } from "@/app/types/branch";
import { getGithubBranchList } from "@/infra/github-api/branches/get-branch-list";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import { checkRateLimit } from "../rate-limit/check-rate-limit";

const getBranchList = async (repositoryUrl: string): Promise<BranchName[]> => {
  await checkRateLimit();

  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);
  const branches: BranchName[] = await getGithubBranchList(
    owner,
    repositoryName,
  );

  return branches;
};

export { getBranchList };
