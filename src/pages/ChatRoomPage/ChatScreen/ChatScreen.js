import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatScreen.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const ChatScreen = ({ socket, roomId }) => {
  console.log('now in chatscreen component...')
  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([])
  const [counterpartInfo, setCounterpartInfo] = useState({})
  const userId = window.localStorage.getItem('user_id')
  const navigate = useNavigate()
  const messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messageQueue])

  useEffect(() => {
    getCounterpartInfo()
  }, [])

  const getCounterpartInfo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/chatroom/counterpart/${roomId}`,
      })
      console.log('COUNTERPARTUSER INFO: ', response.data)
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
    // console.log('receive a message')
    console.log(data, messageQueue)

    setMessageQueue([...messageQueue, data])
  })

  // 開啟配對聊天室之後，後端會發送 match-time-end 事件
  socket.on('match-time-end', () => {
    // 結束之後要加好友
    console.log("time's up!")
    Swal.fire({
      title: 'Do you want to be friend?',
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

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <img src={counterpartInfo.picture_URL} alt="" />
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
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
