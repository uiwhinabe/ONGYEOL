import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import './상담원.css'

export default function Counselor({ onBack, onReturnClick, hidden = false }) {
  return (
    <div className="ongyeol-inquiry ongyeol-counselor" hidden={hidden}>
      <InquiryHeader onBack={onBack} backLabel="문의하기 화면으로 돌아가기" />
      <div className="ongyeol-counselor-content">
        <p className="ongyeol-counselor-request">상담원 연결</p>
        <div className="ongyeol-counselor-message">
          <InquiryAvatar small />
          <div className="ongyeol-counselor-copy">
            <p>안녕하세요 고객님, 질문은 여기에 남겨주시면 최대한 빨리 답변드리겠습니다!😇</p>
            <div className="ongyeol-counselor-hours">
              <p>상담 가능 시간</p>
              <p>평일 10:00 - 17:00</p>
              <p>주말 및 공휴일은 운영하지 않습니다.</p>
            </div>
          </div>
        </div>
        <button className="ongyeol-counselor-return" type="button"
          onClick={onReturnClick}>이전으로</button>
      </div>
      <InquiryComposer />
    </div>
  )
}
