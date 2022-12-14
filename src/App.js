import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BulletinPage from './pages/BulletinPage/BulletinPage'
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage'
import FriendChatRoomPage from './pages/FriendChatRoomPage/FriendChatRoomPage'
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import AdminPage from './pages/AdminPage/AdminPage'
import { io } from 'socket.io-client'

const App = () => {
  // 一進到頁面就建立 socket 物件
  const [socket, setSocket] = useState(
    io(process.env.REACT_APP_BASE_URL, {
      autoConnect: false,
      auth: { token: window.localStorage.getItem('access_token') },
    })
  )

  const [islocalStorageChanged, setIslocalStorageChanged] = useState(0)

  const checkUserData = () => {
    const item = window.localStorage.getItem('access_token')
    if (item) {
      socket.auth.token = item
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
      <Route exact path="/admin" element={<AdminPage socket={socket} />} />
      <Route
        path="*"
        element={
          <div style={{ padding: '200px', textAlign: 'center' }}>
            <h4>404 - Not Found</h4>
          </div>
        }
      />
    </Routes>
  )
}

export default App
