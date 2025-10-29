import { getBranchList } from "@/services/branch/get-branch-list";
import { NextRequest, NextResponse } from "next/server";
import { validateRepositoryUrl } from "@/lib/validators/repository-url";
import AppError from "@/errors/app-error";
import { BranchName } from "@/types/branch";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const repositoryUrl: string = validateRepositoryUrl(
      request.nextUrl.searchParams,
    );
    const branches: BranchName[] = await getBranchList(repositoryUrl);

    return NextResponse.json({ branches });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : SYSTEM_ERROR_MESSAGES.UNEXPECTED;
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { GET };
