import { useRef, useState } from 'react'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import noticeIcon from './delivery-notice.svg'
import './배송문의.css'
import { useAuth } from '../authContext.js'
import useChatTransition from './useChatTransition.js'

// Copy and navigation follow Figma section 541:2159.
const inquiryData = {
  menu: {
    title: '배송 문의',
    paragraphs: ['배송 관련 궁금하신 사항을 선택해주세요'],
    choices: ['tracking', 'duration', 'fee', 'address'],
  },
  tracking: {
    title: '내 주문 배송 조회',
    paragraphs: ['네, 고객님', '주문하신 상품의 배송 현황은\n[마이페이지 주문목록/배송정보] 에서 확인할 수 있습니다.'],
    actionLabel: '주문 목록/ 배송 정보로 이동하기',
    back: 'menu',
  },
  duration: {
    title: '배송 기간 안내',
    paragraphs: ['결제 완료 후 평균 2-3영업일 이내에 출고돼요.', '출고 후에는 배송 상황에 따라 1-3일 정도 소요될 수 있어요'],
    back: 'menu',
  },
  fee: {
    title: '배송비 안내',
    paragraphs: ['네, 고객님 😊', '기본 배송비는 3,000원이며,\n50,000원 이상 구매 시 무료로 배송해 드려요.', '제주 및 도서산간 지역은 추가 배송비가 발생할 수 있어요.'],
    back: 'menu',
  },
  address: {
    title: '배송지 변경',
    paragraphs: ['네, 고객님 😊', '등록된 배송지는 마이페이지의\n[쇼핑정보 > 배송지 관리]에서 변경할 수 있어요', '아래 버튼을 누르면 해당 페이지로 이동해요.'],
    actionLabel: '배송지 관리로 이동하기',
    back: 'menu',
  },
}

export default function DeliveryInquiry({ onBack, onAction, hidden = false }) {
  const { isAuthenticated } = useAuth()
  const [selectedInquiry, setSelectedInquiry] = useState('menu')
  const screenRef = useRef(null)
  useChatTransition(screenRef, selectedInquiry)
  const data = inquiryData[selectedInquiry]
  const goBack = () => data.back ? setSelectedInquiry(data.back) : onBack()
  return (
    <div ref={screenRef} className={`ongyeol-inquiry ongyeol-delivery ongyeol-delivery--${selectedInquiry}`} hidden={hidden}>
      <InquiryHeader onBack={goBack} backLabel={data.back ? '배송 문의 선택으로 돌아가기' : '문의하기 화면으로 돌아가기'} />
      <div className="ongyeol-delivery-content" aria-label={data.title}>
        <p className="ongyeol-delivery-request">{data.title}</p>
        <div className="ongyeol-delivery-answer" aria-live="polite">
          <div className="ongyeol-delivery-message">
            <InquiryAvatar small />
            <div className="ongyeol-delivery-copy">
              {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          {data.actionLabel && <div className="ongyeol-delivery-action-group">
            {/* Destination pages do not exist yet. Keep these actions disabled. */}
            <button className="ongyeol-delivery-action" type="button" disabled title="연결할 페이지가 준비 중입니다">{data.actionLabel}</button>
            {!isAuthenticated && <p className="ongyeol-delivery-login-note"><img src={noticeIcon} alt="" />로그인 후 이용할 수 있습니다.</p>}
          </div>}
        </div>
        <div className={`ongyeol-delivery-choices${data.choices ? ' ongyeol-delivery-choices--menu' : ''}`} role="group" aria-label="배송 문의 선택">
          {data.choices?.map((key) => <button className="ongyeol-inquiry-choice ongyeol-delivery-choice" key={key} type="button"
            onClick={(event) => onAction(event, () => setSelectedInquiry(key))}>{inquiryData[key].title}</button>)}
          <button className="ongyeol-inquiry-choice ongyeol-delivery-choice ongyeol-delivery-return" type="button"
            onClick={(event) => onAction(event, goBack)}>이전으로</button>
        </div>
      </div>
      <InquiryComposer />
    </div>
  )
}
