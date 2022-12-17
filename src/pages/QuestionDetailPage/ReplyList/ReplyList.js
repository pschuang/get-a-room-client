import { useNavigate } from 'react-router-dom'
import './ReplyList.css'

const ReplyList = ({ repliers, socket, questionId, isClosed }) => {
  const navigate = useNavigate()

  const createChat = (replier) => {
    if (isClosed) return

    // 是朋友的話不給進入限時聊天室

    if (replier.roomId === null) {
      socket.emit('create-room', { counterpart: replier.userId, questionId })
    } else {
      navigate(`/friendChat/${replier.roomId}`) // 原本就已經有 roomId 就轉頁
    }
  }

  return (
    <>
      {repliers.map((replier) => (
        <div key={replier.userId} className="reply">
          <div className="reply-left">
            <div className="replier">
              <img src={replier.pictureURL} alt="" />
              <p>{replier.nickname}</p>
            </div>
            <p className="answer">{replier.answer}</p>
          </div>
          {!isClosed && (
            <button
              onClick={() => {
                createChat(replier)
              }}
            >
              pick me
            </button>
          )}
        </div>
      ))}
    </>
  )
}

export default ReplyList
