import { atom } from "jotai";

interface RetrospectInitialType {
  spaceId: number | null;
  templateId: number | null;
  tempTemplateId: number | null;
  saveTemplateId: boolean;
}

export const retrospectInitialState = atom<RetrospectInitialType>({
  spaceId: null,
  templateId: null,
  tempTemplateId: null,
  saveTemplateId: false,
});
