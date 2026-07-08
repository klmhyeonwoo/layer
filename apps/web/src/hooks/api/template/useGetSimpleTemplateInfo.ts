import { templateQueryKeys } from "@/hooks/api/template/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";

type InfoReponse = {
  id: number;
  title: string;
  templateName: string;
  imageUrl: string;
};

export const useGetSimpleTemplateInfo = (templateId: number) => {
  const getSimpleTemplateInfo = () => {
    const res = api.get<InfoReponse>(`/api/template/${templateId}/simple-info`).then((res) => res.data);
    return res;
  };

  return useSuspenseQuery({
    queryFn: () => getSimpleTemplateInfo(),
    queryKey: templateQueryKeys.simpleDetail(templateId),
    refetchOnWindowFocus: false,
  });
};
