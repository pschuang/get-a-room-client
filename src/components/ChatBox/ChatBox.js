import { useState } from 'react'
import './ChatBox.css'
import { io } from 'socket.io-client'

// 不自動連線 => hw 1
const socket = io('http://localhost:8000', { autoConnect: false })
// 自動連線 => hw 2
// const socket = io('http://localhost:8000')

// 記住 users 在哪個 room
let rooms = {}
let talking = 0

const ChatBox = () => {
  socket.on('connect', () => {
    console.log(`you connect with id ${socket.id}`)
  })

  const [message, setMessage] = useState('')
  const [messageQueue, setMessageQueue] = useState([
    { userId: '1', message: 'aaa' },
    { userId: '2', message: 'bbb' },
  ])
  const [userId, setUserId] = useState('1')
  const [user, setUser] = useState('')
  const [currentRoomId, setCurrentRoomId] = useState(null) // 小賴新加入

  // 現在跟誰聊天
  const [nowTalkingTo, setNowTalkingTo] = useState(null)

  // question page
  const [repliers, setRepliers] = useState([
    {
      userId: 1,
      isFriend: false,
      roomId: null,
      anwser: '...',
      nickname: 'user 1',
    },
    {
      userId: 2,
      isFriend: false,
      roomId: null,
      anwser: '...',
      nickname: 'user 2',
    },
    {
      userId: 3,
      isFriend: true,
      roomId: '1234',
      anwser: '...',
      nickname: 'user 3',
    },
  ])

  // send button => render message & send message by socket.io
  const sendMessage = () => {
    console.log('rooms: ', rooms)
    console.log('taking to user: ', talking)
    console.log('now sending to room: ', rooms[talking])
    console.log('now talking to: ', nowTalkingTo)

    // 把訊息送給正在聊天的人所在的 room
    socket.emit('send-message', {
      roomId: rooms[nowTalkingTo],
      message: message,
      userId,
    })
    setMessage('') // 這是非同步的
    console.log('after', message)
    setMessageQueue([...messageQueue, { userId, message }])
  }

  // 收到 receive-message event
  //   socket.on('receive-message', (message) => {
  //     console.log('received a message')
  //     setMessageQueue([...messageQueue, message])
  //   })

  // [改] 收到 receive-message event
  socket.on('receive-message', (data) => {
    console.log('receive a message')
    console.log(data, messageQueue)

    setMessageQueue([...messageQueue, data])

    // setMessageQueue((prevState) => {
    //   return [...prevState, { message }]
    // })
  })

  socket.on('create-room-ok', ({ roomId, counterpart }) => {
    console.log('repliers before: ', repliers)
    let oldRepliers = [...repliers]
    let counterReplier = oldRepliers.find(
      (replier) => replier.userId === counterpart
    )
    counterReplier.roomId = roomId

    setRepliers(oldRepliers)
    if (currentRoomId === null) {
      console.log('set current room id')
      setCurrentRoomId(roomId)
    }
    console.log(roomId)

    // 一開始寫的
    console.log('create room: ', roomId)
    console.log('counterpart', counterpart)
    rooms[counterpart] = roomId // 紀錄跟這個 counterpart 聊天 是在哪一個 room
  })

  socket.on('create-room-fail', ({ message }) => {
    console.log(message)
  })

  // send user id
  const sendUserId = () => {
    // manually connect
    socket.connect()
    console.log('is connected')
    // 發送這個 user 的 id 給 socket server
    socket.emit('user-id', userId)
    setUser(`User ${userId}`)
  }

  socket.on('user', (user) => {
    console.log(user)
    setUser(user.name)
  })

  const createChat = (replier) => {
    if (replier.roomId === null) {
      socket.emit('create-room', { counterpart: replier.userId })
      setCurrentRoomId(null)
    } else {
      setCurrentRoomId(replier.roomId)
    }
    //   socket.emit('create-room', { counterpart: replier.userId })

    // 是不是要紀錄 replier 的 user_id?
    setNowTalkingTo(replier.userId)
  }

  return (
    <>
      <h2>
        Hello{' '}
        <span>
          {user} {currentRoomId}
        </span>
      </h2>
      <div className="main-container">
        <div className="friend-list">
          {repliers.map((replier) => {
            return (
              <div
                data-id="2"
                onClick={() => createChat(replier)}
                style={{
                  backgroundColor:
                    currentRoomId !== null && currentRoomId === replier.roomId
                      ? 'lightcoral'
                      : 'lightblue',
                }}
              >
                {replier.nickname} {replier.roomId}
              </div>
            )
          })}
        </div>
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
      <div className="user-container">
        <input
          className="user-input"
          placeholder="user id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="submit-button" onClick={sendUserId}>
          Submit
        </button>
      </div>
    </>
  )
}

export default ChatBox
// after login, get friends list // 小賴新加入
//   const [friends, setFriends] = useState([
//     { userId: 3, roomId: '1234', nickname: 'user 4' },
//     { userId: 4, roomId: '5678', nickname: 'user 4' },
//   ])

// <div
// data-id="1"
// onClick={() => {
//   talking = 1
//   console.log('talking: ', talking)
//   console.log(rooms)
//   console.log('now sending to room: ', rooms[talking])
//   socket.emit('create-room', { counterpart: 1 })
// }}
// >
// user 1
// </div>
// <div
// data-id="2"
// onClick={() => {
//   talking = 2
//   console.log('talking: ', talking)
//   console.log(rooms)
//   console.log('now sending to room: ', rooms[talking])
//   socket.emit('create-room', { counterpart: 2 })
// }}
// >
// user 2
// </div>
// <div
// data-id="3"
// onClick={() => {
//   talking = 3
//   console.log('talking: ', talking)
//   console.log(rooms)
//   console.log('now sending to room: ', rooms[talking])
//   socket.emit('create-room', { counterpart: 3 })
// }}
// >
// user 3
// </div>
