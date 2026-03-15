import React from 'react'
import { Loader, SquarePlus } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApis from '../../../services/GlobalApis'
import { useUser } from "@clerk/clerk-react"
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'



function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState("");
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const { getToken } = useAuth();

    const navigation = useNavigate()

    const onCreate = async () => {
        setLoading(true)
        const uuid = uuidv4();
        console.log(resumeTitle, uuid)
        const token = await getToken();

        const data = {
            title: resumeTitle,
            resumeId: uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName

        }
        GlobalApis.CreateNewResume(data, token)
            .then(resp => {
                console.log(resp)
                setLoading(false)
                navigation("/dashboard/resume/" + resp.data.data.documentId + "/edit")
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }
    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
                onClick={() => {
                    setOpenDialog(true)
                }}>
                <SquarePlus />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title
                            <Input placeholder="Ex. Senior Dev..." className="mt-2" onChange={(e) => setResumeTitle(e.target.value)} />
                        </DialogDescription>
                        <div className='flex justify-end-safe'>
                            <Button variant='ghost' onClick={() => {
                                setOpenDialog(false)
                            }}>Cancel</Button>
                            <Button onClick={() => { onCreate() }} disabled={!resumeTitle || loading}>
                                {loading ?
                                    <Loader className='animate-spin' /> :
                                    "Create"
                                }</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume