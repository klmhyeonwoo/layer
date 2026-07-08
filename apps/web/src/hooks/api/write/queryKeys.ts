type QueryId = number | null | undefined;

export const writeQueryKeys = {
  questions: (spaceId: QueryId, retrospectId: QueryId) => ["questions", spaceId, retrospectId] as const,
  temporaryQuestions: (spaceId: QueryId, retrospectId: QueryId) =>
    ["temporaryQuestion", spaceId, retrospectId] as const,
  answers: (spaceId: QueryId, retrospectId: QueryId) => ["answers", spaceId, retrospectId] as const,
};
