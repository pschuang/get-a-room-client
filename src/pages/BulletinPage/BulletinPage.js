import './BulletinPage.css'
import QuestionInput from './QuestionInput/QuestionInput'
import QuestionUnit from './QuestionUnit/QuestionUnit'
import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from '../../api/axios'
import ReplyPopUp from './ReplyPopUp/ReplyPopUp'
import FriendList from '../../components/FriendList/FriendList'
import Header from '../../components/Header/Header'
import dayjs from 'dayjs'

export const categoryList = [
  { color: '#333333', name: 'all' },
  { color: '#FFBDD9', name: 'sport' },
  { color: '#E5C0FF', name: 'food' },
  { color: '#92F8FF', name: 'philosophy' },
  { color: 'orange', name: 'politics' },
  { color: 'coral', name: 'health' },
  { color: '#92FF88', name: 'movie' },
  { color: 'lightblue', name: 'leisure' },
]

const BulletinPage = ({ socket }) => {
  const [keyword, setKeyord] = useState('')
  const [questions, setQuestions] = useState([])
  const [paging, setPaging] = useState(0)
  const [isNextPage, SetIsNextPage] = useState(false)

  const [isShowReplyPopUp, setIsShowReplyPopUp] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const [isBulletinClosed, setIsBulletinClosed] = useState(false)
  const [closedTime, setClosedTime] = useState('')
  const [nextOpenTime, setNextOpenTime] = useState('')
  const [picture, setPicture] = useState('')

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
    try {
      const response = await axios({
        method: 'GET',
        url: `/questions/${category}`,
        params: {
          paging: loadmorePage || 0,
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
    } catch (err) {
      if (err.response.status === 423) {
        console.log('ERRORRRRRR:', err.response.data)
        setIsBulletinClosed(true)
        setClosedTime(
          dayjs(err.response.data.closedAt)
            .utc(true)
            .local()
            .format('YYYY-MM-DD HH:mm')
        )
        setNextOpenTime(
          dayjs(err.response.data.nextOpenAt)
            .utc(true)
            .local()
            .format('YYYY-MM-DD HH:mm')
        )
      }
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
        <Header socket={socket} />
        <FriendList />
        <div className="page-right-container">
          <div className="main-content-container">
            {isBulletinClosed ? (
              <>
                <h1>已打烊</h1>
                <br />
                <h2>今日終了時間: {closedTime}</h2>
                <h2>明日開放時間: {nextOpenTime}</h2>
              </>
            ) : (
              <div className="bulletin-main-container">
                <QuestionInput picture={picture} setPicture={setPicture} />
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
                    <button
                      className="clear-button"
                      onClick={handleClearFilter}
                    >
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
                    <button
                      className="search-button"
                      onClick={handleSearchClick}
                    >
                      <img src="/icon-search.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div className="temporary-question-list">
                  {questions.map((question) => {
                    return (
                      <QuestionUnit
                        question={question}
                        setSelectedQuestion={setSelectedQuestion}
                        setIsShowReplyPopUp={setIsShowReplyPopUp}
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
            )}
          </div>
        </div>
      </div>
      {isShowReplyPopUp && (
        <ReplyPopUp
          question={selectedQuestion}
          onClose={() => setIsShowReplyPopUp(false)}
          picture={picture}
        />
      )}
    </>
  )
}

export default BulletinPage
