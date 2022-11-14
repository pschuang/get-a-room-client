import './Header.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const Header = ({ socket }) => {
  //
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  const [createdRoomId, setCreatedRoomId] = useState(null)
  const [nickname, setNickname] = useState('')
  const [picture, setPicture] = useState('')
  const [isSignedIn, setIsSignIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/user/info',
      })
      console.log('USER INFO: ', response.data)
      const { nickname, picture_URL } = response.data
      setNickname(nickname)
      setPicture(picture_URL)
      setIsSignIn(true)
    } catch (error) {
      console.log('ERROR', error)
      alert('not authorized, please sign in!')
      navigate('/signin')
    }
  }

  // 如果有 create-room-ok 就轉頁
  socket.on('create-room-ok', ({ roomId, counterpart, isPassive }) => {
    console.log('create-room-ok from the header component')
    console.log('room id: ', roomId)
    console.log('counterpart: ', counterpart)
    if (!isPassive) {
      navigate(`/matchChat/${roomId}`)
    } else {
      // show popup to notify
      setIsShowPopUp(true)
      setCreatedRoomId(roomId)
    }
  })

  socket.on('create-room-fail', ({ message }) => {
    console.log(message)
  })

  return (
    <div className="header">
      {isShowPopUp && (
        <button
          onClick={() => {
            navigate(`/matchChat/${createdRoomId}`)
          }}
        >
          You're picked! go to chat!
        </button>
      )}
      <h3>This is header</h3>
      <img src={picture} alt="" />
      <div>{nickname}</div>
      {isSignedIn && (
        <button
          onClick={() => {
            window.localStorage.removeItem('user_id')
            window.localStorage.removeItem('access_token')
            setIsSignIn(false)
            alert("You've logged out")
            navigate('/signin')
          }}
        >
          Log Out
        </button>
      )}
    </div>
  )
}

export default Header
