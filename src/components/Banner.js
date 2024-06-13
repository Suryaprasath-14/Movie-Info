import React from 'react'

import Poster from '../movieposter.jpg'

const Banner = () => {
  return (
    <div 
    className='h-[20vh] md:h-[58vh] bg-center bg-contain bg-no-repeat flex items-end '
    style={{
        backgroundImage: `url(${Poster})`
    }}>
      <div className=' text-xl md:text-3xl bg-gray-950 bg-opacity-60 text-white text-center p-4 w-full'>
        The Good, the Bad and the Ugly
      </div>

    </div>
  )
}

export default Banner