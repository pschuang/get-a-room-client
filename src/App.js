import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BulletinPage from './pages/BulletinPage/BulletinPage'
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage'
import FriendChatRoomPage from './pages/FriendChatRoomPage/FriendChatRoomPage'
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage'
import { io } from 'socket.io-client'
import LoginInput from './components/LoginInput/LoginInput'

// test

const App = () => {
  const [socket, setSocket] = useState(
    io('http://localhost:8000', { autoConnect: false })
  )
  const [userId, setUserId] = useState('')

  return (
    <>
      <LoginInput setUserId={setUserId} socket={socket} />
      <Routes>
        <Route exact path="/" element={<BulletinPage userId={userId} />} />
        {/* <Route
        exact
        path="/login"
        element={<BulletinPage setSocket={setSocket} />}
      /> */}
        <Route
          exact
          path="/friendChat/:roomId"
          element={<FriendChatRoomPage socket={socket} userId={userId} />}
        />
        <Route
          exact
          path="/matchChat/:roomId"
          element={<ChatRoomPage socket={socket} userId={userId} />}
        />
        <Route
          exact
          path="/question/:id"
          element={<QuestionDetailPage socket={socket} userId={userId} />}
        />
      </Routes>
    </>
  )
}

export default App
