import { LOCAL_STORAGE_KEYS } from "@/config/storage-keys";
import { SocialLoginKind } from "@/types/loginType";

const SOCIAL_LOGIN_TYPES = ["kakao", "apple", "google"] satisfies SocialLoginKind[];

export const getRecentSocialLoginType = (): SocialLoginKind | null => {
  const storedType = localStorage.getItem(LOCAL_STORAGE_KEYS.recentSocialLoginType);

  if (SOCIAL_LOGIN_TYPES.includes(storedType as SocialLoginKind)) {
    return storedType as SocialLoginKind;
  }

  return null;
};

export const setRecentSocialLoginType = (socialType: SocialLoginKind) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.recentSocialLoginType, socialType);
};
