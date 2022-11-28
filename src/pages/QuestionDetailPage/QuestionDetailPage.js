import { useParams } from 'react-router-dom'
import './QuestionDetailPage.css'
import FriendList from '../../components/FriendList/FriendList'
import QuestionDetail from './QuestionDetail/QuestionDetail'
import Header from '../../components/Header/Header'

const QuestionDetailPage = ({ socket }) => {
  const { id } = useParams()
  return (
    <>
      <Header socket={socket} />
      <div className="main-page-container">
        <FriendList />
        <div className="page-right-container">
          <div className="main-content-container">
            <QuestionDetail questionId={id} socket={socket} />
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionDetailPage
