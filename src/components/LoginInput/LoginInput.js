import { useState } from 'react'

const LoginInput = ({ socket, setUserId }) => {
  const [inputValue, setInputValue] = useState('')

  const sendUserId = () => {
    setUserId(inputValue)
    // manually connect
    socket.connect()
    console.log('is connected')
    // 發送這個 user 的 id 給 socket server
    socket.emit('user-id', inputValue)
  }

  return (
    <div className="user-container">
      <input
        className="user-input"
        placeholder="user id"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="submit-button" onClick={sendUserId}>
        Submit
      </button>
    </div>
  )
}

export default LoginInput
