import type { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

type QueryId = number | null | undefined;

export const retrospectQueryKeys = {
  all: ["getAllRetrospects"] as const,
  list: (spaceId: QueryId) => ["getRetrospects", spaceId] as const,
  recommendation: (recommendValue: RecommendTemplateType) => ["recommendTemplate", recommendValue] as const,
};
