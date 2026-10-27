import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import './SK01.css'

export default function SK01({ onBack, onStart }) {
  return (
    <div className="ongyeol-inquiry ongyeol-chat-skin-guide-intro">
      <InquiryHeader onBack={onBack} backLabel="문의하기 화면으로 돌아가기" />
      <div className="ongyeol-chat-skin-guide-intro-content">
        <div className="ongyeol-chat-skin-guide-intro-message">
          <InquiryAvatar small />
          <div className="ongyeol-chat-skin-guide-intro-copy">
            <p>안녕하세요, 고객님 😊</p>
            <p>건강한 피부의 결을 찾아드리는 온결 AI 상담사예요.</p>
            <p>간단한 질문을 통해 현재 피부 상태와 고민과 원인을 확인하고,<br />고객님께 잘 맞는 성분과 제품을 추천해 드릴게요.</p>
            <div className="ongyeol-chat-skin-guide-intro-duration">
              <p>스킨가이드는 약 1분 정도 소요돼요.</p>
              <p>아래 버튼을 눌러 진단을 시작해 볼까요? 🌿</p>
            </div>
          </div>
        </div>
        <button className="ongyeol-chat-skin-guide-intro-start" type="button" onClick={onStart}>스킨 가이드 시작하기</button>
      </div>
      <InquiryComposer />
    </div>
  )
}
