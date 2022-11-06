import { useEffect, useState } from 'react'
import axios from '../../../api/axios'

const ChatScreen = ({ socket, userId, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const response = await axios.get(`/chatroom/messages/${roomId}`)
    console.log(response.data.messages)
    setMessageQueue(response.data.messages)
  }

  //TODO: 重整時，拿 roomId 和 userId 去 query friend 表，如果有資料就再把兩人加進 room 一次
  const sendMessage = () => {
    // console.log('send msg')
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
