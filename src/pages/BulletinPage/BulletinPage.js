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
import Swal from 'sweetalert2'

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
  const [openTime, setOpenTime] = useState('')
  const [closedTime, setClosedTime] = useState('')
  const [nextOpenTime, setNextOpenTime] = useState('')
  const [picture, setPicture] = useState('')
  const [currentFilterCategory, setCurrentFilterCategory] = useState('')
  const [currentKeyword, setCurrentKeyword] = useState('')

  let [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()

  const handleCategoryClick = (category) => {
    searchParams.set('category', category)
    setSearchParams(searchParams)
    setCurrentFilterCategory(category)
  }

  const handleSearchClick = () => {
    searchParams.set('keyword', keyword)
    setSearchParams(searchParams)
    setCurrentKeyword(keyword)
    setKeyord('')
  }

  const handleClearFilter = () => {
    searchParams.set('category', 'all')
    setSearchParams()
    setCurrentFilterCategory('')
    setCurrentKeyword('')
  }

  const handleRuleClick = () => {
    Swal.fire({
      title: 'Get a room rules',
      html: `<div style="margin-left:30px"><p style="line-height:120%" align="justify">1.  Bulletin open for 20 mins, once a day <br>2. You can post 1 question, and create multiple replies. <br>3. Pick a reply or wait to be picked to create a chatroom. <br>4. Once matched, you can chat for 15 mins <br>5. When match ends, decide to be friends in 30s</p></div>`,
    })
  }

  const getQuestions = async (loadmorePage) => {
    const category = searchParams.get('category') || 'all'
    const keyword = searchParams.get('keyword')
    try {
      const response = await axios({
        method: 'GET',
        url: `/questions/${category}`,
        params: {
          paging: loadmorePage || 0,
          keyword: keyword,
        },
      })

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
        setOpenTime(
          dayjs(err.response.data.openAt)
            .utc(true)
            .local()
            .format('YYYY-MM-DD HH:mm')
        )
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
    getQuestions()
    setPaging(0)
  }, [location])

  const handleRefreshQuestions = () => {
    getQuestions()
  }

  useEffect(() => {
    if (!window.localStorage.getItem('has-shown-rule')) {
      handleRuleClick()
      window.localStorage.setItem('has-shown-rule', true)
    }
  }, [])

  return (
    <>
      <div className="main-page-container">
        <Header socket={socket} />
        <FriendList socket={socket} />
        <div className="page-right-container">
          <div className="main-content-container">
            <button className="rule-banner" onClick={handleRuleClick}>
              <img src="/problems.png" alt="" />
              <p>Check playground rule</p>
            </button>
            {isBulletinClosed ? (
              <div className="closed-container">
                <img src="/closed.png" width="40%" alt="" />
                <br />
                <h2>
                  今日開放時間: {openTime} - {closedTime}
                </h2>
                <h2>明日開放時間: {nextOpenTime}</h2>
              </div>
            ) : (
              <div className="bulletin-main-container">
                <QuestionInput
                  picture={picture}
                  setPicture={setPicture}
                  getQuestions={getQuestions}
                  socket={socket}
                />
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
                    <div className="filter-keyword-status-container">
                      <button
                        className="clear-button"
                        onClick={handleClearFilter}
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleRefreshQuestions}
                        className="clear-button refresh-button"
                      >
                        Refresh
                      </button>
                      {(currentFilterCategory || currentKeyword) && (
                        <div className="filter-keyword-status">
                          <p>Now Searching: </p>
                          {currentFilterCategory && (
                            <div># {currentFilterCategory}</div>
                          )}
                          {currentKeyword && <div>{currentKeyword}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="search">
                    <input
                      placeholder="type keyword here"
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
          getQuestions={getQuestions}
          socket={socket}
        />
      )}
    </>
  )
}

export default BulletinPage
