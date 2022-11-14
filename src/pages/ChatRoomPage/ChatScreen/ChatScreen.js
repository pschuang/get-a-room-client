import { useState } from 'react'

const ChatScreen = ({ socket, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const userId = window.localStorage.getItem('user_id')

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
