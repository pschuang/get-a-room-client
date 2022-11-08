import { useState, useEffect } from 'react'
import './QuestionDetail.css'
import ReplyList from '../ReplyList/ReplyList'
import axios from '../../../api/axios'

const QuestionDetail = ({ questionId, socket }) => {
  const [repliers, setRepliers] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    getQuestionsDetails()
  }, [])

  const getQuestionsDetails = async () => {
    const response = await axios.get(`/questions/details/${questionId}`)
    setContent(response.data.content)
    setRepliers(response.data.repliers)
    console.log(response.data.content)
    console.log(response.data.repliers)
  }

  return (
    <div className="question-detail">
      <h1>Your Question: {questionId}</h1>
      <div className="question">{content}</div>
      <ReplyList
        repliers={repliers}
        socket={socket}
        setRepliers={setRepliers}
      />
    </div>
  )
}

export default QuestionDetail
