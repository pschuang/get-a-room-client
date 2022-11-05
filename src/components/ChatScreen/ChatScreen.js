import { useState } from 'react'
import { useLocation } from 'react-router-dom'
const ChatScreen = ({ socket, userId, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([
    { userId: '1', message: 'aaa' },
    { userId: '2', message: 'bbb' },
  ])
  const location = useLocation()
  const isFriend = location.state ? location.state.isFriend : false

  //TODO: 重整時，拿 roomId 和 userId 去 query friend 表，如果有資料就再把兩人加進 room 一次
  const sendMessage = () => {
    // 把訊息送給正在聊天的人所在的 room
    socket.emit('send-message', {
      roomId,
      message,
      userId,
    })
    setMessage('') // 這是非同步的
    console.log('after', message)
    setMessageQueue([...messageQueue, { userId, message }])
  }

  socket.on('receive-message', (data) => {
    console.log('receive a message')
    console.log(data, messageQueue)

    setMessageQueue([...messageQueue, data])
  })

  const sendMessageToFriend = () => {
    socket.emit('send-message-to-friend', {
      roomId,
      message,
      userId,
    })
    console.log('msg to friend: ', {
      roomId,
      message,
      userId,
    })
    setMessage('')
    setMessageQueue([...messageQueue, { userId, message }])
  }
  socket.on('receive-message-from-friend', (data) => {
    console.log(data)
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
        <button
          className="send-button"
          onClick={isFriend ? sendMessageToFriend : sendMessage}
        >
          Send
        </button>
      </div>
    </>
  )
}

export default ChatScreen
