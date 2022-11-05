import { useParams } from 'react-router-dom'
import './ChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from '../../components/ChatScreen/ChatScreen'

const ChatRoomPage = ({ socket, userId }) => {
  const { roomId } = useParams()
  return (
    <>
      <h1>Welcome to this ChatRoomPage</h1>
      <h2>Room {roomId}</h2>
      <div className="page-container">
        <FriendList />
        <div className="main-content-container">
          <ChatScreen socket={socket} userId={userId} roomId={roomId} />
        </div>
      </div>
    </>
  )
}

export default ChatRoomPage
