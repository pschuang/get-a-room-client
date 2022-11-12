import { useState } from 'react'
import './ReplyPopUp.css'
import axios from '../../../api/axios'

const ReplyPopUp = ({ onClose, question }) => {
  const [reply, setReply] = useState('')
  const createReply = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/reply',
        data: {
          user_id: 1,
          question_id: question.id,
          reply: reply,
        },
      })
      setReply('')
      if (response.status === 200) {
        alert('created reply successfully')
        onClose()
      }
    } catch (error) {
      console.log('ERROR: ', error)
    }
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
