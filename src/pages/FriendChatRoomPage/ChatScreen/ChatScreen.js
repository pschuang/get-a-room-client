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

  useEffect(() => {
    console.log(roomId)
    socket.emit('join-room', { roomId })
  }, [roomId])

  //TODO: 重整時，拿 roomId 和 userId 去 query friend 表，如果有資料就再把兩人加進 room 一次

  const sendMessageToFriend = () => {
    console.log('send msg - friend')

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
              message.userId == userId ? 'my-message' : 'counterpart-message'
            }
          >
            <div>
              {message.message} @{' '}
              <span style={{ color: 'navy' }}>{message.created_at}</span>
            </div>
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
        <button className="send-button" onClick={sendMessageToFriend}>
          Send
        </button>
      </div>
    </>
  )
}

export default ChatScreen
