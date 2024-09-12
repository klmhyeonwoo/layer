import { atomWithReset } from "jotai/utils";

import { ProjectType, SpaceValue } from "@/types/space";

const initialState = {
  category: ProjectType.Individual,
  field: [],
  name: "",
  introduction: "",
  imgUrl: "",
  step: 0,
  submit: false,
};

export const spaceState = atomWithReset<SpaceValue>(initialState);
