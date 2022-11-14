import { useParams } from 'react-router-dom'
import './ChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from './ChatScreen/ChatScreen'
import Header from '../../components/Header/Header'

const ChatRoomPage = ({ socket }) => {
  const { roomId } = useParams()
  return (
    <>
      <Header socket={socket} />
      <h1>Welcome to this ChatRoomPage</h1>
      <h2>Room {roomId}</h2>
      <div className="page-container">
        <FriendList />
        <div className="main-content-container">
          <ChatScreen socket={socket} roomId={roomId} />
        </div>
      </div>
    </>
  )
}

export default ChatRoomPage
