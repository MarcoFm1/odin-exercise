import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '../../../components/ui/button'
import { Download } from 'lucide-react'
import ResumePreview from '../../../dashboard/resume/component/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../services/GlobalApis'

function ViewResume() {

    const { resumeId } = useParams()

    const [resumeInfo, setResumeInfo] = useState({
        experience: [],
        education: [],
        skills: []
    })

    useEffect(() => {
        if (resumeId) {
            GetResumeInfo()
        }
    }, [resumeId])

    const GetResumeInfo = () => {
        GlobalApis.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data)
            setResumeInfo(resp.data.data)
        })
    }

    const HandleDownload = () => {
        window.print()
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            
            <div id="no-print">
                <Header />

                <div className="my-16 flex flex-col items-center gap-6">
                    <h2 className='text-center text-3xl font-semibold'>
                        Your resume is ready!
                    </h2>

                    <p className='text-center text-gray-500 max-w-md'>
                        You can now download it and start applying for jobs
                    </p>

                    <Button
                        onClick={HandleDownload}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl shadow-lg transition-all hover:scale-105"
                    >
                        <Download size={18} />
                        Download Resume
                    </Button>
                </div>
            </div>

            <div id="print-area" className="mx-10 md:mx-20 lg:mx-36">
                <ResumePreview />
            </div>

        </ResumeInfoContext.Provider>
    )
}

export default ViewResume