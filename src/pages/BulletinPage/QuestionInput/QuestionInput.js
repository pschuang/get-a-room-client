import './QuestionInput.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'
import Swal from 'sweetalert2'

const categoryList = [
  { id: 1, color: '#FFBDD9', name: 'sport' },
  { id: 2, color: '#E5C0FF', name: 'food' },
  { id: 3, color: '#92F8FF', name: 'philosophy' },
  { id: 4, color: 'red', name: 'politics' },
  { id: 5, color: 'coral', name: 'health' },
  { id: 6, color: '#92FF88', name: 'movie' },
  { id: 7, color: 'blue', name: 'leisure' },
]

const QuestionInput = ({ picture, setPicture }) => {
  const [questionContent, setQuestionContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isCreated, setIsCreated] = useState(false)
  const [questionInfo, setQuestionInfo] = useState({})
  const [nickname, setNickname] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    getCreatedQuestionStatus()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/user/info',
      })
      console.log('USER INFO: ', response.data)
      const { nickname, picture_URL } = response.data
      setNickname(nickname)
      setPicture(picture_URL)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (id) => {
    setSelectedCategoryId(id)
    setIsOpen(false)
  }

  const createQuestion = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/questions',
        data: {
          category_id: selectedCategoryId,
          content: questionContent,
        },
      })
      console.log(response)
      setQuestionContent('')
      if (response.status === 200) {
        Swal.fire({
          title: 'Great!',
          text: 'Created question successfully',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      }
    } catch (error) {
      console.log('ERROR: ', error)
      Swal.fire({
        title: 'Oops!',
        text: error.response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    }
  }

  const getCreatedQuestionStatus = async () => {
    const response = await axios({
      method: 'GET',
      url: '/questions/status',
    })
    const { alreadyCreatedQuestion, question } = response.data

    console.log('get status', response.data)

    setIsCreated(alreadyCreatedQuestion)
    setQuestionInfo(question)
  }

  const toQuestionDetailPage = () => {
    navigate(`/question/${questionInfo.id}`)
  }
  return (
    <div className="question-input-container">
      {isCreated ? (
        <>
          <div className="question-input-container-top">
            <img src={questionInfo.pictureURL} alt="" />
            <div>{questionInfo.nickname}</div>
            <div>{questionInfo.category}</div>
          </div>
          <p>{questionInfo.content}</p>
          <div className="question-input-container-bottom">
            <div className="reply-popup-container-middle">
              <img src="/icon-comment.svg" alt="" />
              <p>{questionInfo.reply_counts}</p>
            </div>
            <button onClick={toQuestionDetailPage}>View</button>
          </div>
        </>
      ) : (
        <>
          <div className="question-input-container-top">
            <img src={picture} alt="" />
            <div>{nickname}</div>
            <div className="dropdown">
              <div className="dropdown-header" onClick={handleOpen}>
                {selectedCategoryId
                  ? categoryList.find((item) => item.id === selectedCategoryId)
                      .name
                  : 'Select category'}
              </div>
              <div
                className="dropdown-body"
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                {categoryList.map((item) => {
                  return (
                    <div
                      className="dropdown-item"
                      key={item.name}
                      onClick={() => handleItemClick(item.id)}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="question-input-container-bottom">
            <input
              placeholder="What's on your mind?"
              value={questionContent}
              onChange={(e) => {
                setQuestionContent(e.target.value)
              }}
            />
            <button onClick={createQuestion}>Send</button>
          </div>
        </>
      )}
    </div>
  )
}

export default QuestionInput
