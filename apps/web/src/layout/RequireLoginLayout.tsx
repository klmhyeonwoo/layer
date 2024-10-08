import { PATHS } from "@layer/shared";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { Fragment, ReactNode, useCallback, useEffect } from "react";

import { fetchMemberInfo } from "@/api/login";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { useTestNatigate } from "@/lib/test-natigate";
import { authAtom } from "@/store/auth/authAtom";

type RequireLoginProps = {
  children: ReactNode;
};

export function RequireLoginLayout({ children }: RequireLoginProps) {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useTestNatigate();
  const curPath = window.location.pathname;
  const { setPeople } = useMixpanel();

  const redirectLogin = useCallback(() => {
    Cookies.set(COOKIE_KEYS.redirectPrevPathKey, curPath);
    void navigate(PATHS.login(), { replace: true });
  }, [curPath, navigate]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (auth.isLogin) return;

      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        try {
          const response = await fetchMemberInfo();
          setAuth({ isLogin: true, name: response.name, email: response.email, memberRole: response.memberRole, imageUrl: response.imageUrl });

          setPeople(response.memberId.toString());
        } catch (error) {
          console.error("Error fetching member info:", error);
          redirectLogin();
        }
      } else {
        redirectLogin();
      }
    };

    // 비동기 함수를 즉시 호출하고 반환된 Promise를 처리합니다.
    checkLoginStatus().catch((error) => {
      console.error("유저 정보 불러오기 실패:", error);
    });
  }, [auth, redirectLogin, setAuth, setPeople]);

  if (!auth.isLogin) return null;

  return <Fragment>{children}</Fragment>;
}
