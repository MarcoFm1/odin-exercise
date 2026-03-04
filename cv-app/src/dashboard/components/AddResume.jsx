import React from 'react'
import { SquarePlus } from "lucide-react"
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

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState();

    const onCreate = () =>{
        const uuid = uuidv4();
        console.log(resumeTitle, uuid)
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
                            <p>Add a title</p>
                            <Input placeholder="Ex. Senior Dev..." className="mt-2" onChange={(e)=>setResumeTitle(e.target.value)}/>                        
                        </DialogDescription>
                        <div className='flex justify-end-safe'>
                            <Button variant='ghost' onClick={()=>{
                                setOpenDialog(false)
                            }}>Cancel</Button>
                            <Button onClick={()=>{onCreate()}} disabled={!resumeTitle}>Create</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume