import { useState, useEffect } from 'react'
import './ReplyPopUp.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'

const ReplyPopUp = ({ onClose, question, picture, getQuestions, socket }) => {
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState([])

  useEffect(() => {
    getReplies()
  }, [])

  const getReplies = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/reply/${question.id}`,
      })
      setReplies(response.data.replies)
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

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
        socket.emit('create-reply', { questionOwnerId: question.user_id })
        Swal.fire({
          title: 'Great!',
          text: 'Created reply successfully',
        }).then((result) => {
          if (result.isConfirmed) {
            onClose()
            getQuestions()
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
          onClose()
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
          <b>{question.nickname}</b>
          <div>#{question.category}</div>
        </div>
        <h3>{question.content}</h3>
        <div className="reply-popup-container-middle">
          <img src="/icon-comment.svg" alt="" />
          <p>{question.reply_counts}</p>
        </div>
        {replies.length !== 0 && (
          <div className="replies-container">
            {replies.map((replier, index) => (
              <div key={index} className="reply">
                <img src={replier.pictureURL} alt="" />
                <h5>{replier.nickname}</h5>
                <p>{replier.answer}</p>
              </div>
            ))}
          </div>
        )}
        <div className="reply-popup-container-bottom">
          <img src={picture} alt="" />
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
