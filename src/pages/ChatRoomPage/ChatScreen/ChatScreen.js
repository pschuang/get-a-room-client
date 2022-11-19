import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ChatScreen = ({ socket, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const userId = window.localStorage.getItem('user_id')
  const navigate = useNavigate()

  const sendMessage = () => {
    // 把訊息送給正在聊天的人所在的 room
    socket.emit('send-message', {
      roomId,
      message,
      userId,
    })
    setMessage('') // 這是非同步的
    setMessageQueue([...messageQueue, { userId, message }])
  }

  socket.on('receive-message', (data) => {
    // console.log('receive a message')
    console.log(data, messageQueue)

    setMessageQueue([...messageQueue, data])
  })

  // TODO: 開啟配對聊天室之後，後端會發送 match-time-end 事件
  socket.on('match-time-end', () => {
    // TODO: 結束之後要加好友
    console.log("time's up!")
    Swal.fire({
      title: 'Do you want to be friend?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'YES',
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: 要
      } else if (result.isDenied) {
        // TODO: 不要
      }
    })
  })

  socket.on('room-not-exist', (err) => {
    Swal.fire({
      title: 'Oops!',
      text: err.message,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`)
      }
    })
  })

  return (
    <>
      <div className="message-container">
        {messageQueue.map((message, index) => (
          <div
            key={index}
            className={
              message.userId === userId ? 'my-message' : 'counterpart-message'
            }
          >
            <div>{message.message}</div>
          </div>
        ))}
      </div>
      <div className="send-container">
        <input
          className="message-input"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  )
}

export default ChatScreen
