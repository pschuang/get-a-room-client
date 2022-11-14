import { useState, useEffect } from 'react'
import './QuestionDetail.css'
import ReplyList from '../ReplyList/ReplyList'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom'

const QuestionDetail = ({ questionId, socket }) => {
  const navigate = useNavigate()
  const [repliers, setRepliers] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    getQuestionsDetails()
  }, [])

  const getQuestionsDetails = async () => {
    try {
      const response = await axios.get(`/questions/details/${questionId}`)
      setContent(response.data.content)
      setRepliers(response.data.repliers)
      console.log('got question details!')
    } catch (error) {
      alert(error.response.data.message, 'now navigating to bullentin page')
      navigate(`/`)
    }
  }

  return (
    <div className="question-detail">
      <h1>Your Question: {questionId}</h1>
      <div className="question">{content}</div>
      <ReplyList repliers={repliers} socket={socket} />
    </div>
  )
}

export default QuestionDetail
