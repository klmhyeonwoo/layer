type QueryId = number | null | undefined;

export const actionItemQueryKeys = {
  personal: ["personalActionItemList"] as const,
  member: (memberId: QueryId) => ["actionItemList", "member", memberId] as const,
  space: (spaceId: QueryId) => ["actionItemList", "space", spaceId] as const,
  team: (spaceId: QueryId) => ["getTeamActionItemList", spaceId] as const,
  recentTeam: (spaceId: QueryId) => ["getRecentTeamActionItemList", spaceId] as const,
  recentPersonal: (spaceId: QueryId) => ["getRecentPersonalActionItemList", spaceId] as const,
  personalBySpace: (spaceId: QueryId) => ["getPersonalActionItemListBySpace", spaceId] as const,
};
