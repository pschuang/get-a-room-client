import './QuestionInput.css'
import { useState } from 'react'
import axios from '../../../api/axios'

const categoryList = [
  { id: 1, color: '#FFBDD9', name: 'sport' },
  { id: 2, color: '#E5C0FF', name: 'food' },
  { id: 3, color: '#92F8FF', name: 'philosophy' },
  { id: 4, color: 'red', name: 'politics' },
  { id: 5, color: 'coral', name: 'health' },
  { id: 6, color: '#92FF88', name: 'movie' },
  { id: 7, color: 'blue', name: 'leisure' },
]

const QuestionInput = () => {
  const [questionContent, setQuestionContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

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
          user_id: 1,
          category_id: selectedCategoryId,
          content: questionContent,
        },
      })
      console.log(response)
      setQuestionContent('')
      if (response.status === 200) {
        alert('created question successfully')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  return (
    <div className="question-input-container">
      <div className="question-input-container-top">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3940/3940437.png"
          alt=""
        />
        <div className="dropdown">
          <div className="dropdown-header" onClick={handleOpen}>
            {selectedCategoryId
              ? categoryList.find((item) => item.id === selectedCategoryId).name
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
    </div>
  )
}

export default QuestionInput
