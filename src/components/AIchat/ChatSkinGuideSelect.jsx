import { skinTypes } from './skinGuideData.js'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './Inquiry.jsx'
import './ChatSkinGuideSelect.css'

export default function ChatSkinGuideSelect({ onBack, selectedSkinType, onSelectSkinType }) {
  return (
    <div className="ongyeol-inquiry ongyeol-chat-skin-guide-step-one">
      <InquiryHeader onBack={onBack} backLabel="스킨가이드 안내 화면으로 돌아가기" />
      <div className="ongyeol-chat-skin-guide-step-one-content">
        <div className="ongyeol-chat-skin-guide-step-one-message">
          <InquiryAvatar small />
          <div className="ongyeol-chat-skin-guide-step-one-copy">
            <p>좋아요! 고객님이 현재 가장 고민하고 있는 피부 문제를 알려주세요.</p>
            <p>아래 다섯 가지 고민 중 가장 궁금한 항목을 하나 선택해 주세요 🌿</p>
          </div>
        </div>
        <div className="ongyeol-chat-skin-guide-step-one-options" role="group" aria-label="피부 고민 선택">
          {skinTypes.map(({ id, label }) => (
            <button key={id} className="ongyeol-chat-skin-guide-step-one-option" type="button"
              aria-pressed={selectedSkinType === id} onClick={() => onSelectSkinType(id)}>{label}</button>
          ))}
        </div>
      </div>
      <InquiryComposer />
    </div>
  )
}
