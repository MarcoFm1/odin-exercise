import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../../services/GlobalApis'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
    currentlyWorking: false,

}

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience?.length > 0) {
            setExperienceList(resumeInfo.experience)
        }
    }, [])

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        console.log(newEntries)
        setExperienceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: '',
        }])
    }

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (value, index) => {
        const newEntries = [...experienceList];
        newEntries[index].workSummary = value;

        setExperienceList(newEntries);

        setResumeInfo(prev => ({
            ...prev,
            experience: newEntries
        }));
    };

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: [...experienceList]
        }));
    }, [experienceList]);

    const formattedExperience = experienceList.map((exp) => {
        if (exp.id) {
            return {
                id: exp.id,
                ...exp
            }
        }

        return {
            ...exp
        }
    })

    const onSave = () => {
        setLoading(true)

        const data = {
            experience: formattedExperience
        }

        GlobalApis.UpdateResumeDetail(params.resumeId, data)
            .then(res => {
                console.log(res)
                setLoading(false)
                toast("Details updated!")
            })
            .catch(err => {
                console.log(err.response?.data)
                setLoading(false)
            })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.title || ""}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.companyName || ""} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.city || ""} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.state || ""}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.startDate || ""} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.endDate || ""}
                                        disabled={item?.currentlyWorking}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            checked={item?.currentlyWorking || false}
                                            onChange={(event) => {
                                                const newEntries = experienceList.slice();
                                                newEntries[index].currentlyWorking = event.target.checked;

                                                if (event.target.checked) {
                                                    newEntries[index].endDate = "";
                                                }

                                                setExperienceList(newEntries);
                                            }}
                                        />
                                        <label className="text-xs flex justify-end">Currently Working Here</label>
                                    </div>

                                </div>
                                <div className='col-span-2'>
                                    {/* Work Summery  */}
                                    <RichTextEditor
                                        index={index}
                                        value={item?.workSummary || ""}
                                        onChange={(value) => handleRichTextEditor(value, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience