import { Routes, Route } from 'react-router-dom'
import BulletinPage from './pages/BulletinPage/BulletinPage'
import ChatRoom from './pages/ChatRoom/ChatRoom'

// test

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<BulletinPage />} />
      <Route exact path="/chatroom" element={<ChatRoom />} />
    </Routes>
  )
}

export default App
