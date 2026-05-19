import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { MembersItem } from "@/component/space/members/MembersItem";
import { EditType } from "@/component/space/members/MembersList";
import { useChangeLeader } from "@/hooks/api/space/members/useApiChangeLeader";
import { useApiGetMemers } from "@/hooks/api/space/members/useApiGetMembers";
import { useApiKickMember } from "@/hooks/api/space/members/useApiKickMembers";
import { useModal } from "@/hooks/useModal";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function MembersEditList() {
  const { spaceId: rawSpaceId } = useParams() as { spaceId: string };
  const spaceId = Number(rawSpaceId);
  const { editType } = useLocation().state as { editType: EditType };
  const { data, isLoading } = useApiGetMemers(spaceId);
  const { mutate: kickMember } = useApiKickMember(spaceId);
  const { mutate: changeLeader } = useChangeLeader(spaceId);
  const { open } = useModal();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [leaderId, setLeaderId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      const leaderIndex = data.findIndex((member) => member.isLeader);
      const leader = data[leaderIndex];

      if (leader) {
        setLeaderId(leader.id);
        setSelectedOption(leader.id);
      }
    }
  }, [data]);

  const onClickEdit = (memberId: number) => {
    open({
      title: "팀원을 삭제하시겠어요?",
      contents: "삭제하시면 다시 되돌릴 수 없어요",
      onConfirm: () => kickMember({ spaceId, memberId }),
      options: {
        buttonText: ["취소", "삭제"],
      },
    });
  };

  const handleRadioChange = (value: number) => {
    setSelectedOption(value);
  };

  const onChangeLeader = () => {
    if (selectedOption == null) return;

    open({
      title: "대표자를 변경하시겠어요?",
      contents: "대표자를 변경하면\n팀 스페이스 관리 권한이 변경돼요",
      onConfirm: () => changeLeader({ spaceId, memberId: selectedOption }),
      options: {
        buttonText: ["취소", "변경"],
      },
    });
  };

  if (isLoading) return <LoadingModal />;

  return (
    <DefaultLayout title={editType === "LEADER" ? "대표자 변경" : "팀원 추방"}>
      <Spacing size={0.5} />
      <Typography color="gray800" variant="body16Medium">
        {`팀원 ${data?.length}`}
      </Typography>
      <Spacing size={2.5} />
      {data?.map((member) => (
        <MembersItem
          key={member.id}
          editType={editType}
          onClickEdit={() => onClickEdit(member.id)}
          handleRadioChange={() => handleRadioChange(member.id)}
          selectedOption={selectedOption}
          {...member}
        />
      ))}
      {editType === "LEADER" && (
        <ButtonProvider>
          <ButtonProvider.Primary onClick={onChangeLeader} disabled={leaderId == null || leaderId === selectedOption}>
            변경
          </ButtonProvider.Primary>
        </ButtonProvider>
      )}
    </DefaultLayout>
  );
}
