import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    typeof : "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGE2ZWVmY2Y3ZjQ1NDNhMDg0YWRiMThjOGQwYmU2ZiIsIm5iZiI6MTczNDg1MjQ2NC43MjcsInN1YiI6IjY3NjdiZjcwMDNhM2FhNTMzMDkxMWJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2KTWHUJ5st2va3Uo4FqA0m9Ddp_EgLEJBw-epjXf0TM'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back_arrow_icon" onClick={()=>{navigate('/')}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player