import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BulletinPage from './pages/BulletinPage/BulletinPage'
import ChatRoom from './pages/ChatRoom/ChatRoom'
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage'
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage'
import { io } from 'socket.io-client'
import LoginInput from './components/LoginInput/LoginInput'

// test

const App = () => {
  const [socket, setSocket] = useState(
    io('http://localhost:8000', { autoConnect: false })
  )
  const [userId, setUserId] = useState('1')

  return (
    <>
      <LoginInput userId={userId} setUserId={setUserId} socket={socket} />
      <Routes>
        <Route exact path="/" element={<BulletinPage />} />
        {/* <Route
        exact
        path="/login"
        element={<BulletinPage setSocket={setSocket} />}
      /> */}
        <Route exact path="/chatroom" element={<ChatRoom />} />
        <Route
          exact
          path="/chat/:roomId"
          element={<ChatRoomPage socket={socket} userId={userId} />}
        />
        <Route
          exact
          path="/question/:id"
          element={<QuestionDetailPage socket={socket} />}
        />
      </Routes>
    </>
  )
}

export default App
