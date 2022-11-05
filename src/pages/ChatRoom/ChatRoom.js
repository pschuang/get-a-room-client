import ChatBox from '../../components/ChatBox/ChatBox'
import './ChatRoom.css'

const ChatRoom = ({ userId }) => {
  return (
    <>
      <h1>Welcome to this ChatRoom</h1>
      <ChatBox />
    </>
  )
}

export default ChatRoom
