import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignInBox.css'
import axios from '../../../api/axios'

const SignInBox = ({ setIslocalStorageChanged }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // turn to sign up page
  const toSignUp = () => {
    navigate('/signup')
  }
  // sign in
  const signin = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/user/signin',
        data: {
          email: email,
          password: password,
        },
      })
      console.log(response.data)
      // TODO: server user data remove
      const { access_token, user } = response.data
      window.localStorage.setItem('access_token', access_token)
      // 當使用者登入時，會更改狀態並觸發 checkUserData，使 client 端重新建立連線
      setIslocalStorageChanged((prev) => prev + 1)
      //
      // const newSocket = io('http://localhost:8000', {
      //   autoConnect: false,
      //   auth: { token: access_token },
      // })
      // setSocket(newSocket)
      // newSocket.connect()

      //
      // socket.auth.token = access_token
      // socket.connect()
      //
      // socket.emit('user-id', user.id)

      setEmail('')
      setPassword('')
      alert('you sign in successfully')
      navigate('/')
    } catch (error) {
      console.log('Woops! Error!', error)
      // if (error.response.status === 400 || error.response.status === 403) {
      //   alert(error.response.data.error)
      // }
    }
  }

  return (
    <div className="signin-main-container">
      <div className="signin-left-half">
        <div className="signin-icon-bar">
          <img src="deer.png" alt="logo" />
          <p>GET A ROOM</p>
        </div>
        <form className="signin-form">
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password">password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </form>
        <button className="signin-button" onClick={signin}>
          Sign in
        </button>
        <span>OR</span>
        <button className="to-signup-button" onClick={toSignUp}>
          Sign up
        </button>
      </div>
      <div className="signin-right-half">
        <img src="signin-cover.png" alt="" />
      </div>
    </div>
  )
}

export default SignInBox
