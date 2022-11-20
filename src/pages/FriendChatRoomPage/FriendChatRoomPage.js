import { useParams } from 'react-router-dom'
import './FriendChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from './ChatScreen/ChatScreen'
import Header from '../../components/Header/Header'

const FriendChatRoomPage = ({ socket }) => {
  const { roomId } = useParams()
  return (
    <>
      <div className="main-page-container">
        <Header socket={socket} />
        <FriendList />
        <div className="page-right-container">
          <div className="main-content-container">
            <ChatScreen socket={socket} roomId={roomId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FriendChatRoomPage
