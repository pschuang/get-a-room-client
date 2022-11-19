import { useNavigate } from 'react-router-dom'
import './ReplyList.css'

const ReplyList = ({ repliers, socket, questionId, isClosed }) => {
  const navigate = useNavigate()

  const createChat = (replier) => {
    if (isClosed) {
      console.log(isClosed, 'isClosed')
      return
    }

    //TODO: 是朋友的話不給進入限時聊天室
    if (replier.roomId === null) {
      console.log(socket)
      socket.emit('create-room', { counterpart: replier.userId, questionId })
      //   setCurrentRoomId(null)
    } else {
      // 原本就已經有 roomId 就轉頁
      navigate(`/friendChat/${replier.roomId}`)
    }
  }

  return (
    <>
      {repliers.map((replier) => (
        <div
          key={replier.userId}
          onClick={() => {
            createChat(replier)
          }}
          className="reply"
        >
          <div className="replier">
            <img src={replier.pictureURL} alt="" />
            <p>{replier.nickname}</p>
          </div>
          <div>{replier.answer}</div>
        </div>
      ))}
    </>
  )
}

export default ReplyList
