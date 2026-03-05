import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApis from '../../services/GlobalApis'
import ResumeCard from './components/ResumeCard'


function Dashboard() {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])
  useEffect(() => {
    if (user) {
      GetResumeList()
    }
  }, [user])


  const GetResumeList = () => {
    GlobalApis.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res => {
      console.log(res)
      setResumeList(res.data.data)
    })
  }


  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-2xl'>My Resume</h2>
      <p>Start Creating your resume for your next job</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCard resume={resume} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard