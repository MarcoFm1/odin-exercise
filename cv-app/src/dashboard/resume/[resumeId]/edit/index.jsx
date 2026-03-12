import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from "../../component/ResumePreview"
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApis from '../../../../../services/GlobalApis';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState({});
    useEffect(() => {
        if (resumeId) {
            GetResumeInfo();
        }
    }, [resumeId])


    const GetResumeInfo = () => {
        GlobalApis.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <FormSection />
                {resumeInfo && <ResumePreview />}
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume