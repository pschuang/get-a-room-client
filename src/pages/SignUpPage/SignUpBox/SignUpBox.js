import './SignUpBox.css'

const SignUpBox = () => {
  return (
    <div className="signup-main-container">
      <div className="signup-left-half">
        <div className="signup-icon-bar">
          <img src="ostrich.png" alt="logo" />
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
            <img src="rabbit.png" alt="bear" />
            <img src="puffer-fish.png" alt="" />
            <img src="bear.png" alt="" />
            <img src="deer.png" alt="" />
            <img src="dog.png" alt="" />
            <img src="elephant.png" alt="" />
            <img src="lion.png" alt="" />
            <img src="llama.png" alt="" />
            <img src="ostrich.png" alt="" />
            <img src="panda.png" alt="" />
          </div>
        </form>
        <button className="signup-button">Sign up</button>
        <span>OR</span>
        <button className="login-button">Log in</button>
      </div>
      <div className="signup-right-half">
        <img
          src="https://images.unsplash.com/photo-1606245081924-c08c2c463d2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80"
          alt=""
        />
      </div>
    </div>
  )
}

export default SignUpBox
