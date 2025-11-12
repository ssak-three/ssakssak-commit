import { z } from "zod";

const diagramTypes = z.enum(["class", "sequence", "flowchart"]);

const diagram = z
  .object({
    type: z.literal("diagram"),
    diagram: diagramTypes,
    title: z.string(),
    description: z.string(),
    chart: z.string(),
    caption: z.string(),
  })
  .strict();

const analysisExplanation = z
  .object({
    type: z.literal("explanation"),
    title: z.string().nullable(),
    description: z.string(),
  })
  .strict();

const codeHighlightRange = z.object({
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive(),
});

const codeDiffFile = z
  .object({
    codeDiffSummary: z.string(),
    path: z.string(),
    code: z.string(),
    language: z.string(),
    status: z.string(),
    highlights: z.array(codeHighlightRange),
  })
  .strict();

const analysisCodeDiff = z
  .object({
    type: z.literal("code-diff"),
    title: z.string(),
    description: z.string(),
    files: z.array(codeDiffFile).min(1),
    caption: z.string(),
  })
  .strict();

const analysis = z.discriminatedUnion("type", [
  diagram,
  analysisExplanation,
  analysisCodeDiff,
]);

const analyzedCommitSchema = z
  .object({
    commitId: z.string(),
    commitDate: z.string().datetime(),
    commitMessage: z.string(),
    author: z.string(),
    commitLink: z.string(),
    changeSummary: z.string(),
    analyses: z.array(analysis).min(1),
    commitConclusion: z.string(),
  })
  .strict();

const commitAnalysesSchema = z.object({
  commits: z.array(analyzedCommitSchema).min(1),
});

const overallAnalysisSchema = z
  .object({
    reportTitle: z.string(),
    reportSummary: z.string(),
    reportConclusion: z.string(),
  })
  .strict();

const analysisResultSchema = z.object({
  repositoryUrl: z.string(),
  branch: z.string(),
  reportTitle: z.string(),
  reportSummary: z.string(),
  reportConclusion: z.string(),
  commits: z.array(analyzedCommitSchema).min(1),
});

export {
  overallAnalysisSchema,
  commitAnalysesSchema,
  analyzedCommitSchema,
  analysisResultSchema,
};
