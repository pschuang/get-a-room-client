import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './SignUpBox.css'
import axios from '../../../api/axios'

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
  const selectPicture = (e) => {
    setPictureId(e.target.dataset.id)
  }
  // sign up
  const signup = async () => {
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
    if (response.status === 200) {
      alert('you sign up successfully')
      navigate('/signin')
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
            <img src="rabbit.png" alt="" data-id="1" onClick={selectPicture} />
            <img
              src="puffer-fish.png"
              alt=""
              data-id="2"
              onClick={selectPicture}
            />
            <img src="bear.png" alt="" data-id="3" onClick={selectPicture} />
            <img src="deer.png" alt="" data-id="4" onClick={selectPicture} />
            <img src="dog.png" alt="" data-id="5" onClick={selectPicture} />
            <img
              src="elephant.png"
              alt=""
              data-id="6"
              onClick={selectPicture}
            />
            <img src="lion.png" alt="" data-id="7" onClick={selectPicture} />
            <img src="llama.png" alt="" data-id="8" onClick={selectPicture} />
            <img src="ostrich.png" alt="" data-id="9" onClick={selectPicture} />
            <img src="panda.png" alt="" data-id="10" onClick={selectPicture} />
          </div>
          <div>the is picture id : {pictureId}</div>
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
