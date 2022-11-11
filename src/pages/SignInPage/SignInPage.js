import Header from '../../components/Header/Header'
import SignInBox from './SignInBox/SignInBox'
import './SignInPage.css'

const SignInPage = () => {
  return (
    <>
      <Header />
      <div className="signup-page-container">
        <SignInBox />
      </div>
    </>
  )
}

export default SignInPage
