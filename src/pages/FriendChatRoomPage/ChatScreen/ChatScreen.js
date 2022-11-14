import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'

const ChatScreen = ({ socket, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const navigate = useNavigate()
  const userId = window.localStorage.getItem('user_id')

  useEffect(() => {
    getMessages()
  }, [roomId])

  const getMessages = async () => {
    const response = await axios.get(`/chatroom/messages/${roomId}`)
    console.log(response.data.messages)
    setMessageQueue(response.data.messages)
  }

  useEffect(() => {
    console.log(roomId)
    socket.emit('join-room', { roomId })
  }, [roomId])

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

  socket.on('join-room-fail', ({ message }) => {
    alert(message)
    navigate('/')
  })

  socket.on('connect_error', (err) => {
    console.log(err.message) // prints the message associated with the error
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
        <button className="send-button" onClick={sendMessageToFriend}>
          Send
        </button>
      </div>
    </>
  )
}

export default ChatScreen
