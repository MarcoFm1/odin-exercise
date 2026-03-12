function EducationalPreview({ resumeInfo }) {

  const educationList = resumeInfo?.education || [];

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>

      <hr
        className='border-[1.5px] my-2'
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      {educationList.map((education, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {education?.universityName}
          </h2>

          <h2 className='text-xs flex justify-between'>
            {education?.degree} in {education?.major}
          </h2>

          <span>
            {education?.startDate} - {education?.endDate}
          </span>

          <p className='text-xs'>{education?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default EducationalPreview