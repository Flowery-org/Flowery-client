'use client';

import { useState } from 'react';
import { Button } from '@packages/ui/components/button';
import { Bell } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function ModalTest() {
  const [messageModal, setMessageModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold mb-8">모달 테스트</h1>
      
      {/* 메시지 모달 */}
      <Button 
        onClick={() => setMessageModal(true)}
        variant="outline"
        className="w-[200px]"
      >
        메시지 모달
      </Button>
      <Modal
        open={messageModal}
        onClose={() => setMessageModal(false)}
        variant="message"
        description="이메일 주소가 비밀번호는 'abcqwerf!' 입니다."
      />

      {/* 확인 모달 */}
      <Button 
        onClick={() => setConfirmModal(true)}
        variant="outline"
        className="w-[200px]"
      >
        확인 모달
      </Button>
      <Modal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        variant="confirm"
        description="친구 추가 하시겠습니까?"
        onSubmit={() => {
          console.log('확인');
          setConfirmModal(false);
        }}
        onCancel={() => {
          console.log('취소');
          setConfirmModal(false);
        }}
      />

      {/* 입력 모달 */}
      <Button 
        onClick={() => setInputModal(true)}
        variant="outline"
        className="w-[200px]"
      >
        입력 모달
      </Button>
      <Modal
        open={inputModal}
        onClose={() => setInputModal(false)}
        variant="input"
        title="알림 추가하기"
        icon={<Bell className="w-5 h-5" />}
        description="상세 내용을 입력해주세요"
        onSubmit={(value) => {
          console.log('입력값:', value);
          setInputModal(false);
        }}
      />

      {/* 프로필 모달 */}
      <Button 
        onClick={() => setProfileModal(true)}
        variant="outline"
        className="w-[200px]"
      >
        프로필 모달
      </Button>
      <Modal
        open={profileModal}
        onClose={() => setProfileModal(false)}
        variant="profile"
      >
        <div className="flex justify-between items-center py-2 border-b border-border/30">
          <span className="text-muted-foreground">아이디</span>
          <span className="text-foreground">plant123</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/30">
          <span className="text-muted-foreground">지금까지 키운 꽃 개수</span>
          <span className="text-foreground">5</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">오늘 첫 성장</span>
          <span className="text-foreground">완료</span>
        </div>
      </Modal>
    </main>
  );
}