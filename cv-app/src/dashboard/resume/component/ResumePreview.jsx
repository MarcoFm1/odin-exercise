import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDataPreview from './preview/PersonalDataPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperienciePreview from "./preview/ProfessionalExperienciePreview"
import EducationalPreview from "./preview/EducationalPreview"
import SkillsPreview from "./preview/SkillsPreview"


function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor:resumeInfo?.themeColor}}>
            <PersonalDataPreview resumeInfo={resumeInfo}/>
            <SummaryPreview resumeInfo={resumeInfo}/>
            <ProfessionalExperienciePreview resumeInfo={resumeInfo}/>
            <EducationalPreview resumeInfo={resumeInfo}/>
            <SkillsPreview resumeInfo={resumeInfo}/>
        </div>
    )
}

export default ResumePreview