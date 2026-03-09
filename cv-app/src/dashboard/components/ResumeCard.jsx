import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCard({resume}) {
  return (
    <Link to={"/dashboard/resume/"+resume.documentId+"/edit"}>
        <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg transition-all hover:shadow-md hover:scale-105'>
            <Notebook/>
        </div>
        <h2 className='text-center my-1 '>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCard