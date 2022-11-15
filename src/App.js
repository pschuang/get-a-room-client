import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BulletinPage from './pages/BulletinPage/BulletinPage'
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage'
import FriendChatRoomPage from './pages/FriendChatRoomPage/FriendChatRoomPage'
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import { io } from 'socket.io-client'

const App = () => {
  // 一進到頁面就建立 socket 物件
  const [socket, setSocket] = useState(
    io('http://localhost:8000', {
      autoConnect: false,
      auth: { token: window.localStorage.getItem('access_token') },
    })
  )

  const [islocalStorageChanged, setIslocalStorageChanged] = useState(0)

  const checkUserData = () => {
    const item = window.localStorage.getItem('access_token')
    if (item) {
      console.log('before auth token', socket.auth.token)
      socket.auth.token = item
      console.log(socket.auth.token, 'hihihihihi connect')

      // TODO: SERVER JWT get user id (user-id emit)
      socket.connect()
    }
  }
  // 一進到頁面 or 當 localstorage 有改變時就帶不同 token 去重新建立連線
  useEffect(() => {
    checkUserData()
  }, [islocalStorageChanged])

  return (
    <Routes>
      <Route exact path="/" element={<BulletinPage socket={socket} />} />
      <Route
        exact
        path="/friendChat/:roomId"
        element={<FriendChatRoomPage socket={socket} />}
      />
      <Route
        exact
        path="/matchChat/:roomId"
        element={<ChatRoomPage socket={socket} />}
      />
      <Route
        exact
        path="/question/:id"
        element={<QuestionDetailPage socket={socket} />}
      />
      <Route exact path="/signup" element={<SignUpPage />} />
      <Route
        exact
        path="/signin"
        element={
          <SignInPage setIslocalStorageChanged={setIslocalStorageChanged} />
        }
      />
    </Routes>
  )
}

export default App
