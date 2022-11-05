import './FriendList.css'
import { useNavigate } from 'react-router-dom'

const FriendList = ({ socket }) => {
  const navigate = useNavigate()
  const friends = [
    { userId: 3, roomId: '5566', nickname: 'Japopo' },
    { userId: 4, roomId: '5678', nickname: 'Shiela' },
    { userId: 5, roomId: '5566', nickname: 'Ramona' },
  ]

  const createChatWithFriend = (friend) => {
    socket.emit('join-room', { roomId: friend.roomId })
    navigate(`/chat/${friend.roomId}`, { state: { isFriend: true } })
  }

  return (
    <div className="friend-list">
      {friends.map((friend) => (
        <div
          key={friend.userId}
          onClick={() => {
            createChatWithFriend(friend)
          }}
        >
          {friend.nickname} user id: {friend.userId}
        </div>
      ))}
    </div>
  )
}

export default FriendList
