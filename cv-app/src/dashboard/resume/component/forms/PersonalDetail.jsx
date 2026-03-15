import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { Input } from "../../../../../src/components/ui/input"
import { Button } from "../../../../../src/components/ui/button"
import GlobalApis from '../../../../../services/GlobalApis'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"

function PersonalDetail({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const params = useParams()
    useEffect(() => {
        console.log(params)
    }, [])

    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)

        GlobalApis.UpdateResumeDetail(params.resumeId, formData)
            .then(resp => {
                console.log(resp);
                enabledNext(true)
                setLoading(false)
                toast("Detail updated")
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <form action="" onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label htmlFor="" className='text-sm'>First Name</label>
                        <Input name="firstName" required onChange={handleInputChange} defaultValue={resumeInfo?.firstName}/>
                    </div>
                    <div>
                        <label htmlFor="" className='text-sm'>Last Name</label>
                        <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName}/>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="" className='text-sm'>Job Title</label>
                        <Input name="jobTitle" required onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle}/>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="" className='text-sm'>Address</label>
                        <Input name="address" required onChange={handleInputChange} defaultValue={resumeInfo?.address}/>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="" className='text-sm'>Phone</label>
                        <Input name="phone" required onChange={handleInputChange} defaultValue={resumeInfo?.phone}/>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="" className='text-sm'>Email</label>
                        <Input name="email" required onChange={handleInputChange} defaultValue={resumeInfo?.email}/>
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                    </Button>                
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail