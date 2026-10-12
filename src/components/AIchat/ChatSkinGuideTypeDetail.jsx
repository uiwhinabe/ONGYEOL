import { Fragment } from 'react'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './Inquiry.jsx'
import './ChatSkinGuideTypeDetail.css'

export default function ChatSkinGuideTypeDetail({ data, onBack, onContinue }) {
  return (
    <div className="ongyeol-inquiry ongyeol-chat-skin-guide-type-detail">
      <InquiryHeader onBack={onBack} backLabel="피부 타입 선택 화면으로 돌아가기" />
      <div className="ongyeol-chat-skin-guide-type-detail-content">
        <div className="ongyeol-chat-skin-guide-type-detail-message">
          <InquiryAvatar small />
          <div className="ongyeol-chat-skin-guide-type-detail-copy">
            <p>{data.title}</p>
            {data.paragraphs.map((lines, paragraphIndex) => <p key={paragraphIndex}>
              {lines.map((line, lineIndex) => <Fragment key={lineIndex}>{lineIndex > 0 && <br />}{line}</Fragment>)}
            </p>)}
          </div>
        </div>
        <button className="ongyeol-chat-skin-guide-type-detail-action" type="button"
          disabled={!onContinue} onClick={onContinue} title={!onContinue ? '성분 안내는 준비 중입니다' : undefined}>{data.actionLabel}</button>
      </div>
      <InquiryComposer />
    </div>
  )
}
