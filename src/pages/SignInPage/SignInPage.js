import SignInBox from './SignInBox/SignInBox'
import './SignInPage.css'

const SignInPage = ({ setIslocalStorageChanged }) => {
  return (
    <>
      <div className="signup-page-container">
        <SignInBox setIslocalStorageChanged={setIslocalStorageChanged} />
      </div>
    </>
  )
}

export default SignInPage
