import { Analysis } from "@/types/analysis";
import { CommitDetail } from "@/types/commit";
import CodeDiff from "@/app/ui/report-view/main-area/commit/code-diff";
import DiagramBox from "@/app/ui/report-view/main-area/commit/diagram-box";
import Explanation from "@/app/ui/report-view/main-area/commit/explanation";

const ANALYSIS_TYPES = {
  EXPLANATION: "explanation",
  CODE_DIFF: "code-diff",
  DIAGRAM: "diagram",
} as const;

interface CommitSectionProps {
  commits: CommitDetail[];
}

function CommitSection({ commits }: CommitSectionProps) {
  return (
    <div className="space-y-6">
      {commits.map((commit) => {
        const analyses = commit.analyses as Analysis[];

        return (
          <div
            key={commit.commitId}
            id={`commit-${commit.commitId}`}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <header className="bg-stone-50 px-6 py-4">
              <div className="flex flex-col">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  💬 {commit.commitMessage}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span>👤</span>
                    <span>{commit.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🕐</span>
                    <span>{new Date(commit.commitDate).toLocaleString()}</span>
                  </span>
                  <a
                    href={commit.commitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-500 hover:text-blue-700"
                  >
                    {commit.commitId.substring(0, 7)}
                  </a>
                </div>
              </div>
            </header>

            <div className="p-6">
              <div className="space-y-8">
                {analyses.map((analysis, index) => {
                  const key = `${commit.commitId}-${analysis.type}-${index}`;

                  switch (analysis.type) {
                    case ANALYSIS_TYPES.EXPLANATION:
                      return <Explanation key={key} data={[analysis]} />;
                    case ANALYSIS_TYPES.CODE_DIFF:
                      return <CodeDiff key={key} data={[analysis]} />;
                    case ANALYSIS_TYPES.DIAGRAM:
                      return <DiagramBox key={key} data={[analysis]} />;
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommitSection;
