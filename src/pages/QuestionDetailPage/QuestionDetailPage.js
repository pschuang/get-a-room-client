import { useParams } from 'react-router-dom'
import './QuestionDetailPage.css'
import FriendList from '../../components/FriendList/FriendList'
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail'

const QuestionDetailPage = ({ socket }) => {
  const { id } = useParams()
  console.log(id)
  return (
    <>
      <h1>Welcome to this QuestionDetailPage</h1>
      <div className="page-container">
        <FriendList socket={socket} />
        <div className="main-content-container">
          <QuestionDetail questionId={id} socket={socket} />
        </div>
      </div>
    </>
  )
}

export default QuestionDetailPage
