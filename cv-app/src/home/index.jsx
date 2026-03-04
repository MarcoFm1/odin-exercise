import { UserButton } from '@clerk/clerk-react'
import Header from "../components/custom/Header.jsx"
function Home() {
  return (
    <div>
      <Header />
      <UserButton />
      
    </div>
  )
}

export default Home