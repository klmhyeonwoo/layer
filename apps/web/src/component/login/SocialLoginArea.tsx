import { css, Interpolation, Theme } from "@emotion/react";
import Cookies from "js-cookie";
import { HTMLAttributes, useEffect, useState } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Tooltip } from "@/component/common/tip";
import { SocialLoginButton } from "@/component/login/SocialLoginButton.tsx";
import { usePostAppleLogin } from "@/hooks/api/login/usePostAppleToken.ts";
import { SocialLoginKind } from "@/types/loginType";
import { isMobile } from "@/utils/etc";
import { getRecentSocialLoginType } from "@/utils/login/recentSocialLogin";

export function SocialLoginArea({
  onlyContainerStyle,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "type"> & { onlyContainerStyle?: Interpolation<Theme> }) {
  const { mutate: postAppleLogin, isPending } = usePostAppleLogin();
  const [recentSocialLoginType, setRecentSocialLoginType] = useState<SocialLoginKind | null>(null);

  window.AppleID.auth.init({
    clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
    scope: "email",
    redirectURI: `${import.meta.env.VITE_APPLE_REDIRECT_URI}`,
    state: `${import.meta.env.VITE_APPLE_STATE}`,
    nonce: `${import.meta.env.VITE_APPLE_NONCE}`,
    usePopup: true,
  });

  useEffect(() => {
    if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
    }

    setRecentSocialLoginType(getRecentSocialLoginType());
  }, []);

  const kakaoLoginRedirection = () => {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
    const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };

  // 카카오 로그인 함수
  const kakaoLogin = () => {
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

    if (window.Kakao) {
      if (isMobile()) {
        window.Kakao.Auth.authorize({
          redirectUri: KAKAO_REDIRECT_URI,
          fail: () => {
            kakaoLoginRedirection();
          },
          throughTalk: true,
        });
      } else {
        kakaoLoginRedirection();
      }
    }
  };

  const appleLogin = async () => {
    try {
      const {
        authorization: { code, id_token, state },
      } = await window.AppleID.auth.signIn();
      Cookies.set("appleAccessToken", id_token);
      postAppleLogin({ code, id_token, state });
    } catch (error) {
      console.error("apple login error:", error);
    }
  };

  const googleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI as string;
    const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
    window.location.href = link;
  };

  const renderSocialLoginButton = (type: SocialLoginKind, handler: () => void) => {
    const button = <SocialLoginButton type={type} handler={handler} />;

    if (recentSocialLoginType !== type) {
      return button;
    }

    return (
      <Tooltip>
        <Tooltip.Trigger>{button}</Tooltip.Trigger>
        <Tooltip.Content message="최근 로그인" placement="top-end" offsetY={0} arrowOffsetX={5} hideOnClick={true} autoHide={false} />
      </Tooltip>
    );
  };

  return (
    <div
      {...props}
      css={css`
        width: 100%;
      `}
    >
      <ButtonProvider onlyContainerStyle={onlyContainerStyle} isProgress={isPending}>
        {renderSocialLoginButton("kakao", kakaoLogin)}
        {renderSocialLoginButton("apple", appleLogin)}
        {renderSocialLoginButton("google", googleLogin)}
      </ButtonProvider>
    </div>
  );
}
