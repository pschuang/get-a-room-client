import './QuestionUnit.css'
const QuestionUnit = () => {
  return (
    <div className="question-unit">
      <div className="category-bar">
        <div className="category-tag">#movie</div>
      </div>
      <div className="question-box">
        <div className="question-box-name">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3940/3940437.png"
            alt=""
          />
          <div style={{ margin: '10px' }}>name</div>
        </div>
        <div className="question-box-question">
          QuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestion
        </div>
        <div className="question-box-bottom">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G5MDo5FXZmbb_ixkP93imuP5N4KMAGkGlw&usqp=CAU"
            alt=""
          />
          <div>33</div>
          <div className="button-div">
            <button>Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionUnit
