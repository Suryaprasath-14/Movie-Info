import React from 'react'

const Pagination = (props) => {
    const{pageNumberProp, onNext, onPrevious}=props

    
  return (
    <div className='flex justify-center '>
        <div onClick={onPrevious} className='m-4 border-2 p-2 cursor-pointer'>
            Previous
        </div>
        <div className='m-4 border-2 p-2'>
            {pageNumberProp}
        </div>
        <div onClick={onNext} className='m-4 border-2 p-2 cursor-pointer'>
            Next
        </div>
    </div>
  )
}

export default Pagination