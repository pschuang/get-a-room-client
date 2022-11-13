import { useParams } from 'react-router-dom'
import './FriendChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from './ChatScreen/ChatScreen'

const FriendChatRoomPage = ({ socket }) => {
  const { roomId } = useParams()
  return (
    <>
      <h1>Welcome to this FriendChatRoomPage</h1>
      <h2>Room {roomId}</h2>
      <div className="page-container">
        <FriendList />
        <div className="main-content-container">
          <ChatScreen socket={socket} userId={1} roomId={roomId} />
        </div>
      </div>
    </>
  )
}

export default FriendChatRoomPage
