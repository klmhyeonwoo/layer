type QueryId = number | null | undefined;

export const spaceQueryKeys = {
  lists: ["spaces"] as const,
  list: (category: string) => [...spaceQueryKeys.lists, category] as const,
  detail: (spaceId: QueryId) => ["getSpace", spaceId] as const,
  info: (spaceId: QueryId) => ["getSpaceInfo", spaceId] as const,
  members: (spaceId: QueryId) => ["getMembers", spaceId] as const,
};
