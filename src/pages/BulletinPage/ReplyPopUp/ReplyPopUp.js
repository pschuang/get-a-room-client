import { useState } from 'react'
import './ReplyPopUp.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'

const ReplyPopUp = ({ onClose, question }) => {
  const [reply, setReply] = useState('')
  const createReply = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/reply',
        data: {
          question_id: question.id,
          reply: reply,
        },
      })
      setReply('')
      if (response.status === 200) {
        Swal.fire({
          title: 'Great!',
          text: 'Created reply successfully',
        }).then((result) => {
          if (result.isConfirmed) {
            onClose()
            window.location.reload()
          }
        })
      }
    } catch (error) {
      console.log('ERROR: ', error)
      Swal.fire({
        title: 'Oops!',
        text: error.response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
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
