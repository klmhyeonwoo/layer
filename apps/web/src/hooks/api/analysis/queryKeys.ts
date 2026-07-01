type QueryId = number | null | undefined;

export const analysisQueryKeys = {
  member: ["myAnalysis"] as const,
  result: (spaceId: QueryId, retrospectId: QueryId) => ["analysis", spaceId, retrospectId] as const,
  answers: (spaceId: QueryId, retrospectId: QueryId) => ["analysisAnswers", spaceId, retrospectId] as const,
};
