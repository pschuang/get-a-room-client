import './QuestionUnit.css'
import { categoryList } from '../BulletinPage'

const QuestionUnit = ({
  question,
  setSelectedQuestion,
  setIsShowReplyPopUp,
}) => {
  const handleReplyClick = () => {
    setSelectedQuestion(question)
    setIsShowReplyPopUp(true)
  }
  return (
    <div className="question-unit">
      <div className="category-bar">
        <div
          className="category-tag"
          style={{
            backgroundColor: categoryList.find(
              (obj) => obj.name === question.category
            ).color,
          }}
        >
          #{question.category}
        </div>
      </div>
      <div className="question-box">
        <div className="question-box-name">
          <img src={question.pictureURL} alt="" />
          <div style={{ margin: '10px' }}>{question.nickname}</div>
        </div>
        <div className="question-box-question">
          <p>{question.content}</p>
        </div>
        <div className="question-box-bottom">
          <img src="/icon-comment.svg" alt="" />
          <div>{question.reply_counts}</div>
          <div className="button-div">
            <button onClick={handleReplyClick}>Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionUnit
