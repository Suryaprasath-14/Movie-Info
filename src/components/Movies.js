import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'


const Movies = () => {

  const[moviesData, setMoviesData] = useState([])
  const[pageNumber, setPageNumber] = useState(1)
  const [watchlist, setWatchlist] = useState([])
  const [hovered, setHovered] = useState('')

  // BASE URL (name of your func): https://api.themoviedb.org
  // PARAMETER: 1. Path params 2. Query params

  const getTrendingMoviesData = ()=>{
     axios
     .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d3ebd1d2077b44692b9b30701dbe4be2&page=${pageNumber}`)
     .then(response =>{
      console.log(response.data.results)
      setMoviesData(response.data.results)
     } )
  }

 // getTrendingMoviesData() 
 useEffect(() => {
//   const getTrendingMoviesData = ()=>{
//     axios
//     .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d3ebd1d2077b44692b9b30701dbe4be2&page=${pageNumber}`)
//     .then(response =>{
//      //console.log(response.data.results)
//      setMoviesData(response.data.results)
//     } )
//  }
  getTrendingMoviesData()

  let watchListFromLocalStorage = JSON.parse(localStorage.getItem('imdb') || '[]')
  setWatchlist(watchListFromLocalStorage)
  }, [pageNumber])

  const nextPage=()=>{
    setPageNumber(pageNumber+1)
}

const previousPage=()=>{
  if(pageNumber > 1) {
    setPageNumber(pageNumber-1)
  }
}

const addToWatchlist = (movie)=>{
  let updatedWatchlist = [...watchlist, movie]
  setWatchlist(updatedWatchlist)
  localStorage.setItem('imdb', JSON.stringify(updatedWatchlist))

}

const removeFromWatchlist = (movie)=>{
  let updatedWatchlist = watchlist.filter(watchlistMovie =>{
     return watchlistMovie.id !== movie.id
  })
  
  setWatchlist(updatedWatchlist)
  localStorage.setItem('imdb', JSON.stringify(updatedWatchlist))

}

const showAddIcon =(movie)=>{
  return <div className='cursor-pointer' onClick={()=>addToWatchlist(movie)}>
  +
</div>
}

const showRemoveIcon =(movie)=>{
  return <div className='cursor-pointer' onClick={()=>removeFromWatchlist(movie)}>
  x
</div>
}

const isAddedToWatchlist=(movieId)=>{
  return watchlist.some(movie=>{
    return movie.id === movieId
  })
}

const showHover=(movieId)=>{
 setHovered(movieId)
}

const resetHovered=()=>{
    setHovered('')
}
const getMovieCard = movie =>{
  return <div key={movie.id}
                    className='w-[160px] h-[30vh] bg-center bg-cover m-4 md:h-[40vh] md:w-[154px] rounded-xl relative hover:scale-110 duration-500 flex items-end'
                    style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                     }}
                     onMouseOver={()=>showHover(movie.id)}
                     onMouseLeave={resetHovered}
                   >
                    <div className='text-2xl p-2 rounded-xl bg-gray-200 absolute top-0.5 right-0.5 '
                    style={{
                      display:hovered===movie.id?'block' : 'none'
                    }}>
                      {
                        isAddedToWatchlist(movie.id)?showRemoveIcon(movie):showAddIcon(movie)

                      }
                        
                    </div>
                    <div className='text-white font-bold text-center w-full bg-gray-900 bg-opacity-60'>
                     {movie.original_title} 
                    </div>
  
                   </div>

}
  return ( 
    <div className='bg-gray-400'>
      <div className='text-Zxl font-bold text-center m-1  '>Trending Movies</div>
 
      <div className='flex flex-wrap justify-evenly'>
        
      {
        moviesData.map(movie=>{
          return getMovieCard(movie)
        })
      }

        
      </div>
      <Pagination pageNumberProp={pageNumber} onNext={nextPage} onPrevious={previousPage}/>
    </div>
  )
}

export default Movies