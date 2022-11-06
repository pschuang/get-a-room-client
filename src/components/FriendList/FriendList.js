import './FriendList.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getFriends(userId)
  }, [userId])

  const getFriends = async (userId) => {
    const response = await axios.get(`/friends/${userId}`)
    console.log(response.data)
    setFriends(response.data.friends)
  }

  const createChatWithFriend = (friend) => {
    console.log(friend.roomId)
    // socket.emit('join-room', { roomId: friend.roomId })
    navigate(`/friendChat/${friend.roomId}`)
  }

  return (
    <div className="friend-list">
      {friends.map((friend) => (
        <div
          key={friend.userId}
          onClick={() => {
            createChatWithFriend(friend)
          }}
          className="friend"
        >
          <img src={friend.pictureURL} alt="" />{' '}
          <p>
            {' '}
            {friend.nickname} user id: {friend.userId}
          </p>
        </div>
      ))}
    </div>
  )
}

export default FriendList
