import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    .then(()=>{
      navigate('/login');
    })
    .catch((error)=>{
      console.error('logout error', error);
    });
  };
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
        console.log("success")
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])
  return (
    <div className='navbar' ref={navRef}>

      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & popular</li>
          <li>My list</li>
          <li>Browse by language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="search" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="notification" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="profile" className='profile' />
          <img src={caret_icon} alt="dropdown" />

          <div className="dropdown">
            <p onClick={()=>{handleLogout()}}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar