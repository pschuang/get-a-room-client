import { useState, useEffect } from 'react'
import './QuestionDetail.css'
import ReplyList from '../ReplyList/ReplyList'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const QuestionDetail = ({ questionId, socket }) => {
  const navigate = useNavigate()
  const [repliers, setRepliers] = useState([])
  const [content, setContent] = useState('')
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    getQuestionsDetails()
  }, [])

  const getQuestionsDetails = async () => {
    try {
      const response = await axios.get(`/questions/details/${questionId}`)
      setContent(response.data.content)
      setRepliers(response.data.repliers)
      setIsClosed(response.data.isClosed)
      console.log(response.data)
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: error.response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`)
        }
      })
    }
  }

  socket.on('create-room-fail', ({ message }) => {
    Swal.fire({
      title: 'Oops!',
      text: message,
    })
  })

  return (
    <div className="question-detail">
      <h3 className="question-content">{content}</h3>
      {isClosed && <h4>You've been matched today!</h4>}

      <ReplyList
        repliers={repliers}
        socket={socket}
        questionId={questionId}
        isClosed={isClosed}
      />
    </div>
  )
}

export default QuestionDetail
