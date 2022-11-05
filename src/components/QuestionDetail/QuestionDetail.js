import { useState } from 'react'
import './QuestionDetail.css'
import ReplyList from '../ReplyList/ReplyList'

const QuestionDetail = ({ questionId, socket }) => {
  const [repliers, setRepliers] = useState([
    {
      userId: 1,
      isFriend: false,
      roomId: null,
      anwser: '...',
      nickname: 'user 1',
    },
    {
      userId: 2,
      isFriend: false,
      roomId: null,
      anwser: '...',
      nickname: 'user 2',
    },
    {
      userId: 3,
      isFriend: true,
      roomId: '1234',
      anwser: '...',
      nickname: 'user 3',
    },
  ])

  return (
    <div className="question-detail">
      <h1>Your Question: {questionId}</h1>
      <div className="question">你最喜歡哪一家珍奶?</div>
      <ReplyList
        repliers={repliers}
        socket={socket}
        setRepliers={setRepliers}
      />
    </div>
  )
}

export default QuestionDetail
