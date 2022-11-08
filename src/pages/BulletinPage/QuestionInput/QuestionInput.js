import './QuestionInput.css'
const QuestionInput = () => {
  return (
    <div className="question-input-container">
      <div className="question-input-container-top">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3940/3940437.png"
          alt=""
        />
        <button>#sport</button>
      </div>
      <div className="question-input-container-bottom">
        <input placeholder="What's on your mind?" />
        <button>Send</button>
      </div>
    </div>
  )
}

export default QuestionInput
