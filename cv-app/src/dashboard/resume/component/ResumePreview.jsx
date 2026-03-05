import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDataPreview from './preview/PersonalDataPreview'


function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    return (
        <div>
            <PersonalDataPreview resumeInfo={resumeInfo}/>
        </div>
    )
}

export default ResumePreview