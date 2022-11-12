import './QuestionUnit.css'
const QuestionUnit = ({ question }) => {
  return (
    <div className="question-unit">
      <div className="category-bar">
        <div className="category-tag">#{question.category}</div>
      </div>
      <div className="question-box">
        <div className="question-box-name">
          <img src={question.pictureURL} alt="" />
          <div style={{ margin: '10px' }}>{question.nickname}</div>
        </div>
        <div className="question-box-question">{question.content}</div>
        <div className="question-box-bottom">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G5MDo5FXZmbb_ixkP93imuP5N4KMAGkGlw&usqp=CAU"
            alt=""
          />
          <div>{question.reply_counts}</div>
          <div className="button-div">
            <button>Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionUnit
