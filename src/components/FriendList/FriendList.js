import './FriendList.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const FriendList = () => {
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getFriends()
  }, [])

  const getFriends = async () => {
    const response = await axios.get(`/friends`)
    setFriends(response.data.friends)
  }

  const createChatWithFriend = (friend) => {
    navigate(`/friendChat/${friend.roomId}`)
  }

  return (
    <div className="friend-list">
      <h2>Roomies</h2>
      {friends.map((friend) => (
        <div
          key={friend.userId}
          onClick={() => {
            createChatWithFriend(friend)
          }}
          className="friend"
        >
          <img src={friend.pictureURL} alt="" />
          <p>
            <b>{friend.nickname}</b>
          </p>
        </div>
      ))}
    </div>
  )
}

export default FriendList
