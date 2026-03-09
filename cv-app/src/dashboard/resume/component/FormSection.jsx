import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import SummeryDetail from './forms/SummeryDetail';

function FormSection() {
  const [activeFormIndex, setactiveFormIndex] = useState(1)
  const [enabledNext, setEnabledNext] = useState(false)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='outline' className="flex gap-2" size='sm'><LayoutGrid />Theme</Button>
        <div className='flex items-center gap-2'>
          {activeFormIndex > 1 &&
            <Button size="sm" className="" onClick={() => setactiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          }  
          <Button disabled={!enabledNext} className="flex gap-2" size='sm' onClick={() => setactiveFormIndex(activeFormIndex + 1)}>Next <ArrowRight /></Button>

        </div>

      </div>
      {activeFormIndex==1?<PersonalDetail enabledNext={(v)=>setEnabledNext(v)}/>:activeFormIndex==2?<SummeryDetail enabledNext={(v)=>setEnabledNext(v)}/>:null}
    </div>
  )
}

export default FormSection