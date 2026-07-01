import { Z_INDEX } from "@/style/zIndex";
import { css } from "@emotion/react";
import { useState } from "react";

import { Button } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { TextArea } from "@/component/common/input";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ANIMATION } from "@/style/common/animation";
import { useInput } from "@/hooks/useInput";
import { useToast } from "@/hooks/useToast";

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  if (!isOpen) return null;

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const feedbackInput = useInput("");
  const { toast } = useToast();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 제출 가능 여부 확인 (만족도만 필수, 피드백은 선택)
  const canSubmit = selectedRating !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 피드백 제출
    toast.success("소중한 피드백 감사합니다.");
    onClose();
  };

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(6, 8, 12, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: ${Z_INDEX.modal};
        `}
        onClick={handleBackgroundClick}
      >
        <div
          css={css`
            width: 100%;
            max-width: 52rem;
            max-height: 80vh;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            border-radius: 1.2rem;
            box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            margin: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.3s ease-out;
          `}
        >
          {/* 헤더 */}
          <header
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 2.4rem;
            `}
          >
            <Typography variant="subtitle18SemiBold" color="gray900">
              평가 및 피드백
            </Typography>
            <button
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.2rem;
                height: 3.2rem;
                border: none;
                background: transparent;
                border-radius: 0.4rem;
                cursor: pointer;
                transition: background-color 0.2s ease;

                &:hover {
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                }
              `}
              onClick={onClose}
            >
              <Icon icon="ic_close" size={2.4} color={DESIGN_TOKEN_COLOR.gray900} />
            </button>
          </header>

          {/* 콘텐츠 */}
          <div
            css={css`
              flex: 1;
              padding: 2.4rem;
              overflow-y: auto;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 3.2rem;
              `}
            >
              {/* 만족도 평가 */}
              <section>
                <Typography variant="title16Bold" color="gray900" css={css``}>
                  레이어에서의 경험이 만족스러우신가요?
                </Typography>
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    gap: 1.6rem;
                    margin-top: 2.4rem;
                  `}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      css={css`
                        width: 6rem;
                        height: 6rem;
                        border-radius: 50%;
                        border: none;
                        background-color: ${selectedRating === rating ? DESIGN_TOKEN_COLOR.blue500 : DESIGN_TOKEN_COLOR.gray200};
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 3rem;
                        transform: translateY(${selectedRating === rating ? "-4px" : "0px"});

                        &:hover {
                          background-color: ${selectedRating === rating ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
                          transform: translateY(${selectedRating === rating ? "-4px" : "-2px"});
                        }
                      `}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating === 1 && "😞"}
                      {rating === 2 && "😕"}
                      {rating === 3 && "😐"}
                      {rating === 4 && "😊"}
                      {rating === 5 && "😄"}
                    </button>
                  ))}
                </div>
              </section>

              {/* 피드백 입력 */}
              <section
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.8rem;
                `}
              >
                <Typography variant="subtitle16SemiBold" color="gray900">
                  자세한 피드백이 있다면 함께 남겨주세요!
                </Typography>
                <TextArea
                  value={feedbackInput.value}
                  onChange={feedbackInput.handleInputChange}
                  placeholder="좋았던 점이나 불편했던 점을 알려주세요!"
                  height="8rem"
                  maxLength={200}
                  css={css`
                    resize: vertical;
                  `}
                />
                <div
                  css={css`
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 0.8rem;
                  `}
                >
                  <Typography variant="body12Medium" color="gray500">
                    {feedbackInput.value.length}/200
                  </Typography>
                </div>
              </section>
            </div>
          </div>

          {/* 푸터 버튼 */}
          <footer
            css={css`
              padding: 2.4rem;
            `}
          >
            <Button
              colorSchema={canSubmit ? "primary" : "gray"}
              css={css`
                width: 100%;
                cursor: ${canSubmit ? "pointer" : "not-allowed"};
                opacity: ${canSubmit ? 1 : 0.6};
              `}
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              <Typography variant="subtitle16SemiBold" color={canSubmit ? "white" : "gray500"}>
                제출
              </Typography>
            </Button>
          </footer>
        </div>
      </div>
    </Portal>
  );
}
