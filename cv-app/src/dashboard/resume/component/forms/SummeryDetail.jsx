import React, { useEffect, useState, useContext } from 'react'
import { Button } from "../../../../../src/components/ui/button"
import { Textarea } from "../../../../../src/components/ui/textarea"
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../../services/GlobalApis'
import { LoaderCircle } from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { toast } from "sonner";
import { AIChatSession } from '../../../../../services/AIModel'

function SummaryDetail({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState("")
    const [loading, setLoading] = useState(false)

    const params = useParams()

    useEffect(() => {
        if (resumeInfo?.summary) {
            setSummary(resumeInfo.summary)
        }
    }, [resumeInfo])

    const GenerateSummaryAI = async () => {
        try {
            setLoading(true)

            const prompt = `Generate a professional resume summary for: Job title: ${resumeInfo?.jobTitle}. No more than 5 lines.`

            const result = await AIChatSession(prompt)

            setSummary(result)

            setResumeInfo(prev => ({
                ...prev,
                summary: result
            }))
        } catch (error) {
            console.log(error)
            toast("AI generation failed")
        } finally {
            setLoading(false)
        }
    }
    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            data: {
                summary: summary
            }
        }

        GlobalApis.UpdateResumeDetail(params.resumeId, data)
            .then(resp => {
                console.log(resp);
                enabledNext(true)
                setLoading(false)
                toast("Detail updated")
            })
            .catch(error => {
                console.log(error)
                toast("Error saving data")
                setLoading(false)
            })

    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add summary for your job title</p>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add summary</label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary flex gap-2"
                            onClick={GenerateSummaryAI}
                        >
                            <Sparkles /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-2"
                        required
                        value={summary}
                        onChange={(e) => {
                            const value = e.target.value
                            setSummary(value)

                            setResumeInfo(prev => ({
                                ...prev,
                                summary: value
                            }))
                        }}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SummaryDetail