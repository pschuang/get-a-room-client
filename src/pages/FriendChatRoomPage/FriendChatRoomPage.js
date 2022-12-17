import { useParams } from 'react-router-dom'
import './FriendChatRoomPage.css'
import FriendList from '../../components/FriendList/FriendList'
import ChatScreen from './ChatScreen/ChatScreen'
import Header from '../../components/Header/Header'
import { useEffect } from 'react'

const FriendChatRoomPage = ({ socket }) => {
  const { roomId } = useParams()
  useEffect(()=>{
    socket.emit('get-online-friends')
  },[])
  return (
    <>
      <div className="main-page-container">
        <Header socket={socket} />
        <FriendList socket={socket}/>
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
