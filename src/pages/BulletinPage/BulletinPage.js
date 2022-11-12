import './BulletinPage.css'
import QuestionInput from './QuestionInput/QuestionInput'
import QuestionUnit from './QuestionUnit/QuestionUnit'
import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from '../../api/axios'

const categoryList = [
  { color: '#333333', name: 'all' },
  { color: '#FFBDD9', name: 'sport' },
  { color: '#E5C0FF', name: 'food' },
  { color: '#92F8FF', name: 'philosophy' },
  { color: 'red', name: 'politics' },
  { color: 'coral', name: 'health' },
  { color: '#92FF88', name: 'movie' },
  { color: 'blue', name: 'leisure' },
]

const BulletinPage = ({ userId }) => {
  const [keyword, setKeyord] = useState()
  const [questions, setQuestions] = useState([])
  let [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()

  const handleCategoryClick = (category) => {
    searchParams.set('category', category)
    setSearchParams(searchParams)
  }

  const handleSearchClick = () => {
    searchParams.set('keyword', keyword)
    setSearchParams(searchParams)
  }

  const handleClearFilter = () => {
    searchParams.set('category', 'all')
    setSearchParams()
  }

  const getQuestions = async () => {
    const category = searchParams.get('category')
    const keyword = searchParams.get('keyword')
    const response = await axios({
      method: 'GET',
      url: `/questions/${category}`,
      params: {
        keyword: keyword,
      },
    })
    setQuestions(response.data.questions)
  }
  useEffect(() => {
    console.log(location)
    getQuestions()
  }, [location])


  return (
    <>
      <h1>This is a BulletinPage</h1>
      <div className="bulletin-page-container">
        <div className="temporary-friend-list"></div>
        <div className="bulletin-main-container">
          <QuestionInput />
          <div className="category-search-container">
            <div className="category-list">
              {categoryList.map((category, index) => (
                <div
                  key={index}
                  className="category"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span style={{ color: category.color }}>#</span>
                  {category.name}
                </div>
              ))}
            </div>
            <button onClick={handleClearFilter}>Clear</button>
            <input
              className="search"
              placeholder="search"
              value={keyword}
              onChange={(e) => {
                setKeyord(e.target.value)
              }}
            />
            <button className="search-button" onClick={handleSearchClick}>
              SEARCH
            </button>
          </div>
          <div className="temporary-question-list">
            {questions.map((question) => {
              return (
                <QuestionUnit
                  question={question}
                  key={`question-${question.id}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default BulletinPage
