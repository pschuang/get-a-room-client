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
          <label for="email">email</label>
          <input id="email"></input>
          <label for="password">password</label>
          <input id="password"></input>
        </form>
        <button className="signin-button">Sign in</button>
        <span>OR</span>
        <button className="to-signup-button" onClick={toSignUp}>
          Sign up
        </button>
      </div>
      <div className="signin-right-half">
        <img
          src="https://images.unsplash.com/photo-1606245081924-c08c2c463d2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80"
          alt=""
        />
      </div>
    </div>
  )
}

export default SignInBox
