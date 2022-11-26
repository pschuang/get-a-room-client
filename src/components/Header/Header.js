import './Header.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Swal from 'sweetalert2'
import Clock from '../Clock/Clock'

const Header = ({ socket }) => {
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
      Swal.fire({
        title: 'Oops!',
        text: 'not authorized, please sign in!',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/signin`)
        }
      })
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
      Swal.fire({
        title: "You're picked!",
        text: 'Go to chat!',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // 被選者答應加入聊天後發送事件
          socket.emit('counterpart-join-match-room', { roomId, counterpart })
          navigate(`/matchChat/${roomId}`)
        }
      })
    }
  })

  // 接 成為好友事件
  socket.on('be-friends-success', () => {
    Swal.fire({
      title: 'Congrats!',
      text: 'You have a new friend!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`)
        window.location.reload()
      }
    })
  })

  // 接 不能成為好友事件
  socket.on('be-friends-fail', () => {
    Swal.fire({
      title: 'Ouch!',
      text: 'Match failed, please come back tmr.',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`)
      }
    })
  })

  const handleLogout = () => {
    // socket.emit('logout')
    socket.disconnect()
    window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('access_token')
    setIsSignIn(false)
    Swal.fire({
      title: "You've logged out",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/signin`)
      }
    })
  }

  return (
    <>
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          <img src="/get-a-room-white.svg" alt="" />
        </div>
        <div className="header-right">
          <img src={picture} alt="" />
          <div>{nickname}</div>
          {isSignedIn && <button onClick={handleLogout}>Log Out</button>}
        </div>
      </div>
      <Clock socket={socket} />
    </>
  )
}

export default Header
