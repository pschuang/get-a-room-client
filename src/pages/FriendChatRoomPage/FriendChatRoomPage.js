import { useParams } from 'react-router-dom'
import './FriendChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from './ChatScreen/ChatScreen'
import Header from '../../components/Header/Header'

const FriendChatRoomPage = ({ socket }) => {
  const { roomId } = useParams()
  return (
    <>
      <Header socket={socket} />
      <h1>Welcome to this FriendChatRoomPage</h1>
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

export default FriendChatRoomPage
