import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import SummaryDetail from './forms/SummeryDetail';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setactiveFormIndex] = useState(1)
  const [enabledNext, setEnabledNext] = useState(false)
  const {resumeId} = useParams()
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='outline' className="flex gap-2" size='sm' onClick={() => navigate("/")}
><Home />Home</Button>
        <div className='flex items-center gap-2'>
          {activeFormIndex > 1 &&
            <Button size="sm" className="" onClick={() => setactiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          }  
          <Button disabled={!enabledNext} className="flex gap-2" size='sm' onClick={() => setactiveFormIndex(activeFormIndex + 1)}>Next <ArrowRight /></Button>

        </div>

      </div>
      {activeFormIndex==1?<PersonalDetail enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==2?<SummaryDetail enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==3?<Experience enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==4?<Education enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==5?<Skills enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex == 6 ? <Navigate to={`/my-resume/${resumeId}/view`} />:null}
    </div>
  )
}

export default FormSection