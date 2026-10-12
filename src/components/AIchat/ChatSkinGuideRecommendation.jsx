import { InquiryAvatar, InquiryHeader, InquiryComposer } from './Inquiry.jsx'
import './ChatSkinGuideRecommendation.css'

export default function ChatSkinGuideRecommendation({ data, onBack }) {
  return (
    <div className="ongyeol-inquiry ongyeol-chat-skin-guide-recommendation">
      <InquiryHeader onBack={onBack} backLabel="피부 타입 안내 화면으로 돌아가기" />
      <div className="ongyeol-chat-skin-guide-recommendation-content">
        <div className="ongyeol-chat-skin-guide-recommendation-message">
          <InquiryAvatar small />
          <div className="ongyeol-chat-skin-guide-recommendation-copy">
            <p>{data.title}</p>
            <p>{data.description}</p>
            <ul className="ongyeol-chat-skin-guide-recommendation-ingredients">
              {data.ingredients.map((ingredient) => <li key={ingredient}>• {ingredient}</li>)}
            </ul>
          </div>
        </div>
        <button className="ongyeol-chat-skin-guide-recommendation-action" type="button" disabled title="제품 확인 화면은 준비 중입니다">{data.actionLabel}</button>
      </div>
      <InquiryComposer />
    </div>
  )
}
