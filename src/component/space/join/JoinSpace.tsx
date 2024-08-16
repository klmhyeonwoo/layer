import { useParams } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function JoinSpace() {
  const { id } = useParams() as { id: string };
  const spaceId = window.atob(id);
  const { data, isLoading } = useApiGetSpace(spaceId); // TODO - 초대한 사람 정보 API 업데이트 후 data 사용하기
  const { mutate } = useApiJoinSpace();

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <DefaultLayout theme="gray" LeftComp={null}>
        <Header title={`짱구님이\n${data?.name} 팀에 초대했어요!`} contents={`${data?.name} 팀에서 함께 회고를 진행해볼까요?`} />
        <ButtonProvider>
          <ButtonProvider.Primary onClick={() => mutate(Number(spaceId))}>수락하기</ButtonProvider.Primary>
        </ButtonProvider>
      </DefaultLayout>
    </>
  );
}
