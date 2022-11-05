const LoginInput = ({ socket, userId, setUserId }) => {
  const sendUserId = () => {
    // manually connect
    socket.connect()
    console.log('is connected')
    // 發送這個 user 的 id 給 socket server
    socket.emit('user-id', userId)
  }

  return (
    <div className="user-container">
      <input
        className="user-input"
        placeholder="user id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button className="submit-button" onClick={sendUserId}>
        Submit
      </button>
    </div>
  )
}

export default LoginInput
