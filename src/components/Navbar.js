import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../MovieLogo.png'

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
        <img src={Logo} alt='movieLogo' className='w-[50px]'></img>
       {/* Using <Link /> here instead of <a /> to harness the power of react's client side rendering */}
        <Link to='/'>Movies</Link>
        <Link to='/Watchlist'>Watchlist</Link>
    </div>
  )
}

export default Navbar