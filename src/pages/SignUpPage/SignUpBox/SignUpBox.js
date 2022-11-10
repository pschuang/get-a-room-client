import './SignUpBox.css'

const SignUpBox = () => {
  return (
    <div className="signup-main-container">
      <div className="signup-left-half">
        <div className="signup-icon-bar">
          <img src="" alt="" />
          <p>GET A ROOM</p>
        </div>
        <form className="signup-form">
          <label for="email">email</label>
          <input id="email"></input>
          <label for="password">password</label>
          <input id="password"></input>
          <label for="nickname">nickname</label>
          <input id="nickname"></input>
          <label for="nickname">choose a picture</label>
          <div className="image-options-list">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940417.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940403.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940415.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940410.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940416.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940419.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940401.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940418.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940405.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940419.png"
              alt=""
            />
          </div>
        </form>
        <button className="signup-button">Sign up</button>
        <span>OR</span>
        <button className="login-button">Log in</button>
      </div>
      <div className="signup-right-half"><img src="https://images.unsplash.com/photo-1606245081924-c08c2c463d2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80" alt="" /></div>
    </div>
  )
}

export default SignUpBox
