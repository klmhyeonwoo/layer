import { css, keyframes } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RightCompProps = {
  spaceId: string | undefined;
  onDeleteClick: () => void;
  isTooltipVisible: boolean;
};

export function SpaceAppBarRightComp({ spaceId, onDeleteClick, isTooltipVisible }: RightCompProps) {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleModifyFun = () => {
    navigate(`/space/modify/${spaceId}`);
  };

  const toggleBoxVisibility = () => {
    setIsBoxVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsBoxVisible(false);
    }
  };

  useEffect(() => {
    if (isBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoxVisible]);

  return (
    <>
      <div
        css={css`
          display: flex;
          gap: 2.6rem;
          position: relative;
        `}
      >
        <div css={{ position: "relative" }}>
          <Icon icon="ic_plus" color="white" size={1.8} />
          {isTooltipVisible && (
            <div
              css={css`
                position: absolute;
                top: 160%;
                left: -360%;
                transform: translateX(-50%);
                background-color: ${DESIGN_SYSTEM_COLOR.blue600};
                padding: 1rem;
                padding-bottom: 1.2rem;
                border-radius: 0.5rem;
                white-space: nowrap;
                vertical-align: center;
                text-align: center;

                ::after {
                  content: "";
                  position: absolute;
                  top: -0.5rem;
                  right: 1.5rem;
                  border-width: 0 0.5rem 0.5rem 0.5rem;
                  border-style: solid;
                  border-color: transparent transparent ${DESIGN_SYSTEM_COLOR.blue600} transparent;
                }
              `}
            >
              <Typography variant="CAPTION" color="white">
                아이콘을 눌러 회고를 생성해보세요!
              </Typography>
            </div>
          )}
        </div>
        <Icon icon="ic_3point" size={2} onClick={toggleBoxVisibility} />
        {isBoxVisible && (
          <div
            ref={boxRef}
            css={css`
              position: absolute;
              top: 150%;
              right: 0rem;
              background-color: white;
              border: 1px solid #ccc;
              border-radius: 1rem;
              box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
              z-index: 99;
              width: 16.5rem;
              height: 9.2rem;
              padding: 0.3rem 2rem;
            `}
          >
            <button
              onClick={handleModifyFun}
              css={css`
                display: block;
                width: 100%;
                padding: 1.3rem 0;
                text-align: left;
              `}
            >
              <Typography variant="B2_SEMIBOLD">스페이스 수정</Typography>
            </button>
            <button
              onClick={() => {
                toggleBoxVisibility();
                onDeleteClick();
              }}
              css={css`
                display: block;
                width: 100%;
                padding: 1.3rem 0;
                text-align: left;
              `}
            >
              <Typography variant="B2_SEMIBOLD" color="red600">
                스페이스 삭제
              </Typography>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
