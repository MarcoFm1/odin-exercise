import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import {useUser} from "@clerk/clerk-react"

function App() {
  const {user, isLoaded, isSignedIn} = useUser()

  if(!isSignedIn){
    return <Navigate to={"/auth/signin"} />
  }
  return (
    <>
    <Outlet />
    </>
  )
}

export default App
