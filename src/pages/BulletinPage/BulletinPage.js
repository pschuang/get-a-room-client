import './BulletinPage.css'
import QuestionInput from './QuestionInput/QuestionInput'
import QuestionUnit from './QuestionUnit/QuestionUnit'
import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from '../../api/axios'
import ReplyPopUp from './ReplyPopUp/ReplyPopUp'

export const categoryList = [
  { color: '#333333', name: 'all' },
  { color: '#FFBDD9', name: 'sport' },
  { color: '#E5C0FF', name: 'food' },
  { color: '#92F8FF', name: 'philosophy' },
  { color: 'orange', name: 'politics' },
  { color: 'coral', name: 'health' },
  { color: '#92FF88', name: 'movie' },
  { color: 'blue', name: 'leisure' },
]

const BulletinPage = ({ userId }) => {
  const [keyword, setKeyord] = useState()
  const [questions, setQuestions] = useState([])
  const [paging, setPaging] = useState(0)
  const [isNextPage, SetIsNextPage] = useState(false)

  const [isShowReplyPopUp, setIsShowReplyPopUp] = useState(true)

  let [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()

  const handleCategoryClick = (category) => {
    searchParams.set('category', category)
    console.log('searchParams before: ', searchParams.get('category'))
    setSearchParams(searchParams)
    console.log('searchParams after: ', searchParams.get('category'))
  }

  const handleSearchClick = () => {
    searchParams.set('keyword', keyword)
    setSearchParams(searchParams)
  }

  const handleClearFilter = () => {
    searchParams.set('category', 'all')
    setSearchParams()
  }

  const getQuestions = async (loadmorePage) => {
    console.log('getQuestions is called')
    const category = searchParams.get('category') || 'all'
    console.log('category: ', category)
    const keyword = searchParams.get('keyword')
    console.log('keyword: ', keyword)

    const response = await axios({
      method: 'GET',
      url: `/questions/${category}`,
      params: {
        paging: loadmorePage || paging,
        keyword: keyword,
      },
    })

    console.log('RESPONSE: ', response)
    const { questions: questionData, next_paging } = response.data

    if (loadmorePage) {
      setQuestions([...questions, ...questionData])
    } else {
      setQuestions(questionData)
    }
    if (next_paging) {
      SetIsNextPage(true)
    } else {
      SetIsNextPage(false)
    }
  }

  useEffect(() => {
    console.log('location', location)
    getQuestions()
    setPaging(0)
  }, [location])

  return (
    <>
      <div className="main-page-container">
        <h1>This is a BulletinPage</h1>
        <div className="bulletin-page-container">
          <div className="temporary-friend-list"></div>
          <div className="bulletin-main-container">
            <QuestionInput />
            <div className="category-search-container">
              <div>
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
                <button className="clear-button" onClick={handleClearFilter}>
                  Clear
                </button>
              </div>
              <div className="search">
                <input
                  placeholder="search"
                  value={keyword}
                  onChange={(e) => {
                    setKeyord(e.target.value)
                  }}
                />
                <button className="search-button" onClick={handleSearchClick}>
                  <img src="/icon-search.svg" alt="" />
                </button>
              </div>
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
            <button
              className="load-more-button"
              style={{ display: isNextPage ? 'block' : 'none' }}
              onClick={() => {
                getQuestions(paging + 1)
                setPaging(paging + 1)
              }}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      {isShowReplyPopUp && (
        <ReplyPopUp onClose={() => setIsShowReplyPopUp(false)} />
      )}
    </>
  )
}

export default BulletinPage
