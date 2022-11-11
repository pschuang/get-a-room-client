import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignInBox.css'
import axios from '../../../api/axios'

const SignInBox = () => {
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
      const { access_token } = response.data
      window.localStorage.setItem('access_token', access_token)

      setEmail('')
      setPassword('')
      alert('you sign in successfully')
      navigate('/')
    } catch (error) {
      console.log('Woops! Error!')
      if (error.response.status === 400 || error.response.status === 403) {
        alert(error.response.data.error)
      }
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
