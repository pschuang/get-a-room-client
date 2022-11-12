import { useState } from 'react'
import './ReplyPopUp.css'

const question = {
  id: 1,
  user_id: 5,
  start_time: 1667963510010,
  content: '你最喜歡哪一家飲料店?',
  is_closed: 0,
  category: 'food',
  nickname: 'Ruth',
  pictureURL: '/dog.png',
  reply_counts: 3,
}

const ReplyPopUp = ({ onClose }) => {
  const [reply, setReply] = useState('')
  const createReply = () => {
    //:TODO:
  }
  return (
    <>
      <div onClick={onClose} className="dark-bg"></div>
      <div className="reply-popup-container">
        <div className="reply-popup-container-top">
          <img src={question.pictureURL} alt="" />
          <p>{question.nickname}</p>
          <div>{question.category}</div>
        </div>
        <p>{question.content}</p>
        <div className="reply-popup-container-middle">
          <img src="/icon-comment.svg" alt="" />
          <p>{question.reply_counts}</p>
        </div>
        <div className="reply-popup-container-bottom">
          <img src="/dog.png" alt="" />
          <input
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => {
              setReply(e.target.value)
            }}
          />
          <button onClick={createReply}>Reply</button>
        </div>
      </div>
    </>
  )
}

export default ReplyPopUp
