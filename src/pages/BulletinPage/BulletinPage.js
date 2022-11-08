import './BulletinPage.css'
import QuestionInput from './QuestionInput/QuestionInput'
import QuestionUnit from './QuestionUnit/QuestionUnit'

const BulletinPage = ({ userId }) => {
  return (
    <>
      <h1>This is a BulletinPage</h1>
      <div className="bulletin-page-container">
        <div className="temporary-friend-list"></div>
        <div className="bulletin-main-container">
          <QuestionInput />
          <div className="category-search-container">
            <div className="category-list">
              <div className="category">#movie</div>
              <div className="category">#sport</div>
              <div className="category">#travel</div>
              <div className="category">#foodie</div>
              <div className="category">#foodie</div>
              <div className="category">#foodie</div>
              <div className="category">#foodie</div>
              <div className="category">#foodie</div>
              <div className="category">#foodie</div>
            </div>
            <input className="search" placeholder="search" />
          </div>
          <div className="temporary-question-list">
            <QuestionUnit />
            <QuestionUnit />
            <QuestionUnit />
            <QuestionUnit />
            <QuestionUnit />
          </div>
        </div>
      </div>
    </>
  )
}

export default BulletinPage
