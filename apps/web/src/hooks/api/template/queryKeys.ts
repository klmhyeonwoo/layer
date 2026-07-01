type QueryId = number | null | undefined;

export const templateQueryKeys = {
  defaultList: ["getDefaultTemplates"] as const,
  customList: (spaceId: QueryId) => ["getCustomTemplateList", spaceId] as const,
  custom: (formId: QueryId) => ["customTemplate", formId] as const,
  detail: (templateId: QueryId) => ["templateInfo", templateId] as const,
  simpleDetail: (templateId: QueryId) => ["simpleTemplateInfo", templateId] as const,
};
