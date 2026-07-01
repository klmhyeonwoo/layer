import { spaceQueryKeys } from "@/hooks/api/space/queryKeys";
import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { MemberManagementButton } from "./MemberManagementButton";
import { MemberManagementDropdown } from "./MemberManagementDropdown";
import { MemberManagementHeader } from "./MemberManagementHeader";
import { AddMemberButton } from "./AddMemberButton";
import { MemberList } from "./MemberList";
import { LeaderChangeView, MemberDeleteView } from "./MemberActionView";
import { useChangeLeader } from "@/hooks/api/space/members/useApiChangeLeader";
import { useApiKickMember } from "@/hooks/api/space/members/useApiKickMembers";
import { useApiGetMemers } from "@/hooks/api/space/members/useApiGetMembers";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { InviteMemberModal } from "@/component/common/Modal/Member/InviteMemberModal";
import { useModal } from "@/hooks/useModal";
import useClickOutside from "@/hooks/useClickOutside";

export default function MemberManagement({ spaceId }: { spaceId: number }) {
  const queryClient = useQueryClient();
  const { open, close, setProgress } = useModal();

  const [{ data: spaceInfo }] = useQueries({
    queries: [useApiOptionsGetSpaceInfo(spaceId)],
  });

  const { data: membersData } = useApiGetMemers(spaceId);
  const members =
    membersData?.map((member) => ({
      ...member,
      id: Number(member.id),
    })) || [];
  const memberId = Number(Cookies.get(COOKIE_KEYS.memberId));
  const isCurrentUserLeader = members?.find((m) => m.id === memberId)?.isLeader || false;
  const memberCount = spaceInfo?.memberCount || 0;

  const [isOpen, setIsOpen] = useState(false); // 팀원 관리 드롭다운 열림 여부
  const [isEditOpen, setIsEditOpen] = useState(false); // 팀원 관리 드롭다운 내부 편집 버튼 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 팀원 초대 모달 열림 여부

  // 팀원 관리 드롭다운 내부 뷰 타입
  // main: 팀원 관리 뷰, leaderChange: 대표자 변경 뷰, memberDelete: 팀원 삭제 뷰
  const [currentView, setCurrentView] = useState<"main" | "leaderChange" | "memberDelete">("main");
  const [currentLeaderId, setCurrentLeaderId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editDropdownRef = useRef<HTMLDivElement>(null);

  const { mutate: changeLeader } = useChangeLeader(spaceId);
  const { mutate: kickMember } = useApiKickMember(spaceId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(!isEditOpen);
  };

  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  const handleMemberClick = () => {
    // TODO: 멤버 클릭했을때 따로 무슨 기능을 하는지 물어보기
  };

  // 팀원 관리 드롭다운 내부 편집 버튼 클릭 시 뷰 변경
  const handleEditAction = (action: string) => {
    setIsEditOpen(false);

    if (action === "대표자 변경") {
      setCurrentView("leaderChange");
    } else if (action === "팀원 삭제") {
      setCurrentView("memberDelete");
    }
  };

  // 대표자 변경 시 모달 열기
  const handleLeaderChange = (newLeaderId: number) => {
    // 대표자 변경 시 모달 확인 버튼 클릭 시 대표자 변경
    function handleConfirmLeaderChange() {
      setProgress(true);
      changeLeader(
        {
          spaceId,
          memberId: newLeaderId,
        },
        {
          onSuccess: () => {
            // 스페이스 정보를 리패치
            queryClient.invalidateQueries({ queryKey: spaceQueryKeys.lists });
            // 멤버 정보를 리패치 (혹여나 탈퇴하는 경우를 고려)
            queryClient.invalidateQueries({ queryKey: spaceQueryKeys.members(spaceId) });
            setCurrentView("main");
            close();
          },
          onSettled: () => {
            setProgress(false);
          },
        },
      );
    }

    open({
      title: "대표자를 변경하시겠어요?",
      contents: "대표자를 변경하면\n팀 스페이스 관리 권한이 변경돼요",
      onConfirm: () => handleConfirmLeaderChange(),
      onClose: () => close(),
      options: {
        buttonText: ["취소", "변경"],
        autoClose: false,
      },
    });
  };

  // 팀원 삭제 시 모달 열기
  const handleMemberDelete = (memberId: number) => {
    // 팀원 삭제 시 모달 확인 버튼 클릭 시 팀원 삭제
    function handleConfirmMemberDelete() {
      setProgress(true);
      kickMember(
        {
          spaceId,
          memberId: memberId,
        },
        {
          onSuccess: () => {
            setCurrentView("main");
            close();
          },
          onSettled: () => {
            setProgress(false);
          },
        },
      );
    }

    open({
      title: "팀원을 삭제하시겠어요?",
      contents: "삭제하시면 다시 되돌릴 수 없어요",
      onConfirm: () => handleConfirmMemberDelete(),
      onClose: () => close(),
      options: {
        buttonText: ["취소", "삭제"],
        autoClose: false,
      },
    });
  };

  useEffect(
    function syncCurrentLeaderId() {
      const leaderId = members.find((m) => m.isLeader)?.id;
      if (leaderId) {
        setCurrentLeaderId(leaderId);
      }
    },
    [members],
  );

  // 팀원 관리 드롭다운 > 외부 클릭 시, 해당 드롭다운 ON/OFF 여부
  useClickOutside(dropdownRef, (event) => {
    if (dropdownRef.current?.contains(event.target as Node)) return;
    setIsOpen(false);
    setIsEditOpen(false);
    setCurrentView("main");
  });

  return (
    <div
      ref={dropdownRef}
      css={css`
        position: relative;
        display: inline-block;
      `}
    >
      <MemberManagementButton onClick={handleClick} memberCount={memberCount} isOpen={isOpen} />

      {isOpen && (
        <MemberManagementDropdown>
          {currentView === "main" ? (
            <>
              <div
                css={css`
                  padding: 1.6rem 1.6rem 0 1.6rem;
                `}
              >
                <MemberManagementHeader
                  isEditOpen={isEditOpen}
                  onEditClick={handleEditClick}
                  editDropdownRef={editDropdownRef}
                  onEditAction={handleEditAction}
                  isLeader={isCurrentUserLeader}
                  memberCount={memberCount}
                />
              </div>
              <div
                css={css`
                  flex: 1;
                  overflow-y: auto;
                  padding: 0 1.6rem 1.6rem 1.6rem;
                `}
              >
                {spaceInfo?.category === "TEAM" && isCurrentUserLeader && <AddMemberButton onClick={handleAddMember} />}
                <MemberList members={members} onMemberClick={handleMemberClick} />
              </div>
            </>
          ) : currentView === "leaderChange" ? (
            <div
              css={css`
                padding: 1.6rem;
                overflow-y: auto;
              `}
            >
              <LeaderChangeView
                members={members}
                currentLeaderId={currentLeaderId as number}
                onBack={() => setCurrentView("main")}
                onConfirm={handleLeaderChange}
              />
            </div>
          ) : (
            <div
              css={css`
                padding: 1.6rem;
                overflow-y: auto;
              `}
            >
              <MemberDeleteView
                members={members}
                currentLeaderId={currentLeaderId as number}
                onBack={() => setCurrentView("main")}
                onDelete={handleMemberDelete}
              />
            </div>
          )}
        </MemberManagementDropdown>
      )}
      {spaceId && <InviteMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} spaceId={spaceId} />}
    </div>
  );
}
