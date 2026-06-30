import { Z_INDEX } from "@/style/zIndex";
import { FunnelModalType } from "@/types/modal";
import { atom } from "jotai";

export const FunnelModalState = atom<FunnelModalType>({
  isOpen: false,
  title: "",
  step: null,
  contents: "",
  templateTag: "",
  onClose: () => {},
  onConfirm: () => {},
  onPrevious: () => {},
  options: {
    quitButton: true,
    previousButton: true,
  },
  overlayIndex: Z_INDEX.overlay,
});
