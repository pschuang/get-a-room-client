import './FriendList.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const FriendList = ({ socket }) => {
  const [friends, setFriends] = useState([])
  const [onlineFriendIds, setOnlineFriendIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getFriends()
    socket.emit('get-online-friends')
  }, [])

  const getFriends = async () => {
    const response = await axios.get(`/friends`)
    setFriends(response.data.friends)
  }

  const createChatWithFriend = (friend) => {
    navigate(`/friendChat/${friend.roomId}`)
  }

  // 接收上線的朋友的 id
  socket.on('online-friends', (onlineFriends) => {
    setOnlineFriendIds(onlineFriends)
  })

  // // 收到朋友上線
  socket.on('a-friend-connect', (onlineFriends) => {
    setOnlineFriendIds(onlineFriends)
  })

  // // 收到朋友下線
  socket.on('a-friend-disconnect', (onlineFriends) => {
    setOnlineFriendIds(onlineFriends)
  })

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
          <div
            className={
              onlineFriendIds.includes(friend.userId)
                ? 'status-signal-on'
                : 'status-signal-off'
            }
          ></div>
        </div>
      ))}
    </div>
  )
}

export default FriendList
