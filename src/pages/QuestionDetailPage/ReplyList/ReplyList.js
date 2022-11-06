// redirect
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReplyList.css'

const ReplyList = ({ repliers, socket, setRepliers }) => {
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  const [createdRoomId, setCreatedRoomId] = useState(null)

  const navigate = useNavigate()

  const createChat = (replier) => {
    //TODO: 是朋友的話不給進入限時聊天室
    if (replier.roomId === null) {
      console.log(socket)
      socket.emit('create-room', { counterpart: replier.userId })
      //   setCurrentRoomId(null)
    } else {
      // 原本就已經有 roomId 就轉頁
      navigate(`/friendChat/${replier.roomId}`)
    }
  }

  // 如果有 create-room-ok 就轉頁
  socket.on('create-room-ok', ({ roomId, counterpart, isPassive }) => {
    console.log('create-room-ok')
    console.log('room id: ', roomId)
    console.log('counterpart: ', counterpart)
    if (!isPassive) {
      navigate(`/matchChat/${roomId}`)
    } else {
      // show popup to notify
      setIsShowPopUp(true)
      setCreatedRoomId(roomId)
    }
  })

  socket.on('create-room-fail', ({ message }) => {
    console.log(message)
  })

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
      {isShowPopUp && (
        <div>
          <button
            onClick={() => {
              navigate(`/matchChat/${createdRoomId}`)
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setIsShowPopUp(false)
            }}
          >
            No
          </button>
        </div>
      )}
    </>
  )
}

export default ReplyList
