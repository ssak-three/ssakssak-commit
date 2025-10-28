import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import { createReport } from "@/services/reports/create-report";
import { validateReportInput } from "@/lib/validators/report-fields";
import AppError from "@/errors/app-error";
import { saveAnalysisReport } from "@/services/reports/save-report";
import { getToken } from "next-auth/jwt";

async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId || null;
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const body = await request.json();
    const validatedInput = validateReportInput(body);

    const result = await createReport(
      userId,
      validatedInput.reportTitle,
      validatedInput.repositoryOverview,
      validatedInput.repositoryUrl,
      validatedInput.branch,
    );

    if (userId) {
      const savedReport = await saveAnalysisReport(result);
      return NextResponse.json(
        {
          result,
          message: "Report successfully created and saved to database.",
          reportId: savedReport.reportId,
          storageType: "database",
        },
        { status: 201 },
      );
    } else {
      if (token) {
        token.reportHistory = token.reportHistory || [];

        const newReportHistoryItem = {
          reportHistoryId: `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          reportTitle: result.reportTitle,
          repositoryOverview: validatedInput.repositoryOverview,
          repositoryUrl: result.repositoryUrl,
        };

        token.reportHistory.push(newReportHistoryItem);
      }

      const tempReportId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      return NextResponse.json(
        {
          result,
          message: "Report successfully created and saved to session.",
          reportId: tempReportId,
          storageType: "session",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unexpected error";
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { POST };
