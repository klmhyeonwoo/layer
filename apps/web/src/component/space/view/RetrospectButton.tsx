import { css } from "@emotion/react";
import { useMemo } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type RetrospectButtonProps = {
  status: "PROCEEDING" | "DONE" | "HAS_WRITING";
  retrospectId?: number;
  title?: string;
  spaceId?: string;
};

export function RetrospectButton({ status, retrospectId, title, spaceId }: RetrospectButtonProps) {
  const navigate = useNavigate();
  const { color, route, text } = useMemo<{ text: string; route: readonly [string, NavigateOptions]; color: string }>(() => {
    return {
      DONE: {
        text: "분석 확인",
        route: [PATHS.retrospectAnalysis(spaceId!, retrospectId!), { state: { title } }] as const,
        color: DESIGN_TOKEN_COLOR.gray900,
      },
      HAS_WRITING: {
        route: [
          PATHS.write(),
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_TOKEN_COLOR.blue600,
        text: "회고 수정",
      },
      PROCEEDING: {
        route: [
          PATHS.write(),
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_TOKEN_COLOR.blue600,
        text: "회고 작성",
      },
    }[status];
  }, [retrospectId, spaceId, status]);
  const handleNavigate = () => {
    navigate(...route);
  };
  return (
    <button
      onClick={handleNavigate}
      css={css`
        width: auto;
        height: 4rem;
        background-color: ${color};
        border-radius: 0.8rem;
        padding: 1rem 2.4rem;
      `}
    >
      <Typography
        variant="subtitle14SemiBold"
        color="white"
        css={css`
          white-space: nowrap;
        `}
      >
        {text}
      </Typography>
    </button>
  );
}
