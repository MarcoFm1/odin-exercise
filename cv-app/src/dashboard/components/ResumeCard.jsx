import { Loader2Icon, MoreVertical, Notebook, Pencil, Eye, Download, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApis from '../../../services/GlobalApis'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {

  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApis.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div className='rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>

      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div
          className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4 flex flex-col justify-center items-center'
          style={{
            borderColor: resume?.themeColor
          }}
        >

          <img src="/cv.png" width={80} height={80} />

          <h2 className='mt-4 text-lg font-semibold text-black text-center'>
            {resume.title}
          </h2>

        </div>
      </Link>

      <div
        className='border p-3 flex justify-between items-center rounded-b-lg'
        style={{
          background: resume?.themeColor
        }}
      >

        <h2 className='text-sm font-semibold text-black text-center'>
          {resume.title}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-5 w-5 cursor-pointer text-black' />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}
            >
              <Pencil size={16} />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}
            >
              <Eye size={16} />
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}
            >
              <Download size={16} />
              Download
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 text-red-500 cursor-pointer"
              onClick={() => setOpenAlert(true)}
            >
              <Trash size={16} />
              Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>

            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your resume will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={onDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600"
              >
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>

            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  )
}

export default ResumeCardItem