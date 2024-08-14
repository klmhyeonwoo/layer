import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";

import { AnalysisViewPage } from "@/app/home/AnalysisViewPage";
import { GoalViewPage } from "@/app/home/GoalViewPage";
import { RetrospectViewPage } from "@/app/home/RetrospectViewPage";
import { ModifyMyInfo } from "@/app/info/ModifyMyInfo";
import { MyInfo } from "@/app/info/MyInfo";
import { UserDeletion } from "@/app/info/UserDeletion";
import { GoogleLoginRedirection } from "@/app/login/GoogleLoginRedirection";
import { KakaoLoginRedirection } from "@/app/login/KakaoLoginRedirection";
import { LoginPage } from "@/app/login/LoginPage";
import { SetNickNamePage } from "@/app/login/SetNicknamePage";
import { TemplateListPage } from "@/app/retrospect/template/list/TemplateListPage";
import { RetrospectCreate } from "@/app/retrospectCreate/RetrospectCreate";
import { RetrospectCreateComplete } from "@/app/retrospectCreate/RetrospectCreateComplete";
import { CreateDonePage } from "@/app/space/CreateDonePage";
import { CreateNextPage } from "@/app/space/CreateNextPage";
import { CreateSpacePage } from "@/app/space/CreateSpacePage";
import { JoinSpacePage } from "@/app/space/JoinSpacePage";
import { SpaceViewPage } from "@/app/space/SpaceViewPage";
import Staging from "@/app/test/Staging.tsx";
import { RetrospectWriteCompletePage } from "@/app/write/RetrospectWriteCompletePage.tsx";
import { RetrospectWritePage } from "@/app/write/RetrospectWritePage.tsx";
import GlobalLayout from "@/layout/GlobalLayout.tsx";
import { HomeLayout } from "@/layout/HomeLayout";
import { RequireLoginLayout } from "@/layout/RequireLoginLayout";

type RouteChildren = {
  auth: boolean;
} & RouteObject;

const routerChildren: RouteChildren[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <RetrospectViewPage />,
      },
      {
        path: "analysis",
        element: <AnalysisViewPage />,
      },
      {
        path: "goals",
        element: <GoalViewPage />,
      },
    ],
    auth: true,
  },
  {
    path: "/write",
    element: <RetrospectWritePage />,
    auth: true,
  },
  {
    path: "/write/complete",
    element: <RetrospectWriteCompletePage />,
    auth: true,
  },
  {
    path: "/staging",
    element: <Staging />,
    auth: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    auth: false,
  },
  {
    path: "/setnickname/:socialType",
    element: <SetNickNamePage />,
    auth: false,
  },
  {
    path: "/space/create",
    element: <CreateSpacePage />,
    auth: true,
  },
  {
    path: "/space/create/done",
    element: <CreateDonePage />,
    auth: true,
  },
  {
    path: "/space/create/next",
    element: <CreateNextPage />,
    auth: true,
  },
  {
    path: "/space/join/:id",
    element: <JoinSpacePage />,
    auth: false,
  },
  { path: "/api/auth/oauth2/kakao", element: <KakaoLoginRedirection />, auth: false },
  { path: "/api/auth/oauth2/google", element: <GoogleLoginRedirection />, auth: false },

  {
    path: "/retrospect/new",
    element: <RetrospectCreate />,
    auth: true,
  },
  {
    path: "/retrospect/complete",
    element: <RetrospectCreateComplete />,
    auth: true,
  },
  {
    path: "/space/:spaceId",
    element: <SpaceViewPage />,
    auth: true,
  },
  {
    path: "/space/:spaceId/templates",
    element: <TemplateListPage />,
    auth: true,
  },
  {
    path: "/myinfo",
    element: <MyInfo />,
    auth: true,
  },
  {
    path: "/myinfo/modify",
    element: <ModifyMyInfo />,
    auth: true,
  },
  {
    path: "/myinfo/userdeletion",
    element: <UserDeletion />,
    auth: true,
  },
];

const browserRouter = routerChildren.map(({ path, element, auth, children }) => {
  return {
    path,
    element: auth ? <RequireLoginLayout>{element}</RequireLoginLayout> : element,
    children: children?.map((child) => ({
      path: child.path,
      element: auth ? <RequireLoginLayout>{child.element}</RequireLoginLayout> : child.element,
    })),
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: browserRouter,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
