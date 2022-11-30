import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ChatScreen.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const ChatScreen = ({ socket, roomId }) => {
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const [counterpartInfo, setCounterpartInfo] = useState({})
  const [notification, setNotification] = useState(
    `Your counterpart hasn't joined yet`
  )
  const [isActiveUser, setIsActiveUser] = useState(false)
  const userId = window.localStorage.getItem('user_id')
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()

  const messageEndRef = useRef(null)
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messageQueue])

  useEffect(() => {
    getCounterpartInfo()
    setIsActiveUser(searchParams.get('isActive'))
  }, [])

  const getCounterpartInfo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/chatroom/counterpart/${roomId}`,
      })
      setCounterpartInfo(response.data.user)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const sendMessage = () => {
    if (!message) return
    // 把訊息送給正在聊天的人所在的 room
    socket.emit('send-message', {
      roomId,
      message,
      userId,
    })
    setMessage('') // 這是非同步的
    setMessageQueue([
      ...messageQueue,
      {
        userId,
        message,
        created_at: dayjs().utc().format('YYYY-MM-DD HH:mm:ss'),
      },
    ])
  }

  socket.on('receive-message', (data) => {
    setMessageQueue([...messageQueue, data])
  })

  // 開啟配對聊天室之後，後端會發送 match-time-end 事件
  socket.on('match-time-end', ({ DECIDE_TO_BE_FRIEND_TIME_SPAN }) => {
    // 結束之後要加好友
    Swal.fire({
      title: 'Do you want to be friend?',
      text: `You have ${
        DECIDE_TO_BE_FRIEND_TIME_SPAN / 1000
      } seconds to decide.`,
      showDenyButton: true,
      confirmButtonText: 'YES',
      denyButtonText: `NO`,
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit('agree-to-be-friend', { roomId, userId })
        navigate('/')
      } else if (result.isDenied) {
        navigate('/')
      }
    })
  })

  socket.on('room-not-exist', (err) => {
    Swal.fire({
      title: 'Oops!',
      text: err.message,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`)
      }
    })
  })

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  socket.on('counterpart-has-joined', () => {
    setNotification(
      'Your counterpart just joined the room, start counting down...'
    )
  })

  socket.on('counterpart-left-chatroom', () => {
    console.log('counterpart has left')
    setMessageQueue([
      ...messageQueue,
      {
        isNotification: true,
        notification: 'Your counterpart has left...',
      },
    ])
  })

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <img src={counterpartInfo.picture_URL} alt="" />
        <b>{counterpartInfo.nickname}</b>
      </div>
      <div className="message-container">
        {isActiveUser && (
          <div className="chat-notification">{notification}</div>
        )}
        {messageQueue.map((message, index) => {
          if (message.isNotification) {
            return (
              <div className="chat-notification">{message.notification}</div>
            )
          }
          return (
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
          )
        })}
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
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
