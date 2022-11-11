import { useNavigate } from 'react-router-dom'
import './SignInBox.css'

const SignInBox = () => {
  const navigate = useNavigate()
  const toSignUp = () => {
    navigate('/signup')
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
          <input id="email"></input>
          <label htmlFor="password">password</label>
          <input id="password"></input>
        </form>
        <button className="signin-button">Sign in</button>
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
