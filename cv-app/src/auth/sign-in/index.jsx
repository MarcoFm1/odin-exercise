import { SignIn } from "@clerk/clerk-react"

function SignInPage() {
  return (
    <div className="flex justify-center my-10 items-center">
      <SignIn />
    </div>
  )
}

export default SignInPage