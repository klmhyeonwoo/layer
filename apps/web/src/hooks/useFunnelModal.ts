import { useAtom } from "jotai";
import { useCallback } from "react";
import { FunnelModalType } from "@/types/modal";
import { FunnelModalState } from "@/store/modal/funnelModalAtom";

export const useFunnelModal = () => {
  const [state, setState] = useAtom(FunnelModalState);

  const openFunnelModal = useCallback(
    ({ title, step, contents, templateTag, onConfirm, onClose, onPrevious, overlayIndex = 10000, options }: Omit<FunnelModalType, "isOpen">) => {
      console.log(options);
      setState({
        isOpen: true,
        title,
        step,
        contents,
        templateTag,
        onConfirm,
        onClose,
        onPrevious,
        overlayIndex,
        options: {
          previousButton: true,
          quitButton: true,
          ...options,
        },
      });
    },
    [setState],
  );

  const closeFunnelModal = useCallback(() => {
    setState({
      isOpen: false,
      title: "",
      step: null,
      contents: null,
      templateTag: "",
      onClose: () => {},
      onConfirm: () => {},
      onPrevious: () => {},
      overlayIndex: 10000,
      options: {
        previousButton: true,
        quitButton: true,
      },
    });
  }, [setState]);

  return {
    funnelModalState: state,
    openFunnelModal,
    closeFunnelModal,
  };
};
