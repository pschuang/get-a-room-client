import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatScreen.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const ChatScreen = ({ socket, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const [counterpartInfo, setCounterpartInfo] = useState({})
  const navigate = useNavigate()
  const userId = window.localStorage.getItem('user_id')
  const messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messageQueue])

  useEffect(() => {
    getMessages()
  }, [roomId])

  const getMessages = async () => {
    try {
      const response = await axios.get(`/chatroom/messages/${roomId}`)
      console.log(response.data)
      setMessageQueue(response.data.messages)
      setCounterpartInfo(response.data.counterpartInfo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(roomId)
    socket.emit('join-room', { roomId })
  }, [roomId])

  const sendMessageToFriend = () => {
    if (!message) return
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
    setMessageQueue([
      ...messageQueue,
      {
        userId,
        message,
        created_at: dayjs().utc().format('YYYY-MM-DD HH:mm:ss'),
      },
    ])
  }

  socket.on('receive-message-from-friend', (data) => {
    console.log(data)
    setMessageQueue([...messageQueue, data])
  })

  socket.on('join-room-fail', ({ message }) => {
    Swal.fire({
      title: 'Oops!',
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`)
      }
    })
  })

  socket.on('connect_error', (err) => {
    console.log(err.message) // prints the message associated with the error
  })

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      console.log('enter key is press')
      sendMessageToFriend()
    }
  }

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <img src={counterpartInfo.pictureURL} alt="" />
        <b>{counterpartInfo.nickname}</b>
      </div>
      <div className="message-container">
        {messageQueue.map((message, index) => (
          <div
            key={index}
            className={
              message.userId == userId ? 'my-message' : 'counterpart-message'
            }
          >
            <div className="message-time">
              {dayjs(message.created_at).utc(true).local().format('HH:mm')}
            </div>
            <div className="message-content">{message.message}</div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <div className="send-container">
        <input
          className="message-input"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button
          className="send-button"
          onClick={sendMessageToFriend}
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
