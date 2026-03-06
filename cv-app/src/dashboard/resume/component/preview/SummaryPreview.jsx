import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <p>
        {resumeInfo?.summery}
    </p>
  )
}

export default SummaryPreview