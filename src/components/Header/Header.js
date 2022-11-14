import './Header.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ socket }) => {
  //
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  const [createdRoomId, setCreatedRoomId] = useState(null)

  const navigate = useNavigate()

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
      <h3>This is header</h3>
      {isShowPopUp && (
        <button
          onClick={() => {
            navigate(`/matchChat/${createdRoomId}`)
          }}
        >
          You'repicked! go to chat!
        </button>
      )}
    </div>
  )
}

export default Header
