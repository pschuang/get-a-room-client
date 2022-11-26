import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './SignUpBox.css'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'

const pictureList = [
  { id: 1, pictureURL: 'rabbit.png' },
  { id: 2, pictureURL: 'puffer-fish.png' },
  { id: 3, pictureURL: 'bear.png' },
  { id: 4, pictureURL: 'deer.png' },
  { id: 5, pictureURL: 'dog.png' },
  { id: 6, pictureURL: 'elephant.png' },
  { id: 7, pictureURL: 'lion.png' },
  { id: 8, pictureURL: 'llama.png' },
  { id: 9, pictureURL: 'ostrich.png' },
  { id: 10, pictureURL: 'panda.png' },
]
const SignUpBox = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pictureId, setPictureId] = useState(1)

  // const [data, setData] = useState({})
  // turn to sign in page
  const toSignIn = () => {
    navigate('/signin')
  }

  // select picture
  const selectPicture = (id) => {
    setPictureId(id)
  }
  // sign up
  const signup = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/user/signup',
        data: {
          name: name,
          nickname: nickname,
          email: email,
          password: password,
          picture_id: parseInt(pictureId),
        },
      })
      console.log(response)
      setName('')
      setNickname('')
      setEmail('')
      setPassword('')
      setPictureId('')

      Swal.fire({
        title: 'Signed up successfully',
        text: 'Please sign in!',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/signin`)
        }
      })
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: error.response.data.error,
      })
    }
  }
  return (
    <div className="signup-main-container">
      <div className="signup-left-half">
        <img src="/get-a-room.svg" alt="logo" />
        <form className="signup-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              console.log(name)
            }}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
          <label htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
            }}
          ></input>
          <label htmlFor="nickname">Choose a picture</label>
          <div className="image-options-list">
            {pictureList.map((item) => {
              return (
                <img
                  className={pictureId === item.id ? 'picture-active' : ''}
                  src={item.pictureURL}
                  alt=""
                  key={`${item.id}-picture`}
                  onClick={() => {
                    selectPicture(item.id)
                  }}
                />
              )
            })}
          </div>
        </form>
        <button className="signup-button" onClick={signup}>
          Sign up
        </button>
        <span>OR</span>
        <button className="to-signin-button" onClick={toSignIn}>
          Sign in
        </button>
      </div>
      <div className="signup-right-half">
        <img src="signup-cover.png" alt="" />
      </div>
    </div>
  )
}

export default SignUpBox
