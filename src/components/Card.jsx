import React, { useState, useEffect } from 'react'
import useFetch from '../services/useFetch';

const Card = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebouncedSearchTerm] = useState("");
  const [data] = useFetch(debounceSearchTerm, process.env.REACT_APP_API_KEY);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [searchTerm]);

  console.log(data);

  return (
    <div className='card'>
      <div className="header">
        <div className="search flex-d">
          <div className="search-icon">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
          <div className="search-sec"><input className='search-bar' placeholder="search city ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" /></div>
        </div>
      </div>
      {data.location ? <div className="card-body">
        <div className="weather-icon">
          <img src={`${data.location && data.current.condition.icon}`} alt="" srcset="" />
          <span>{data.location && data.current.condition.text}</span>
        </div>
        <div className="location">
          <span>{data.location && data.location.name},</span>
          <span>{data.location && data.location.region},</span>
          <span>{data.location && data.location.country}</span>
        </div>
        <div className="location-details">
          Local Time:<span>{data.location && data.location.localtime}</span><br />
          Feels Like:<span>{data.location && data.current.feelslike_c}</span><br />
          KP/H<span>{data.location && data.current.gust_kph}</span><br />
          Humidity:<span>{data.location && data.current.humidity}</span><br />
          Temp: <span>{data.location && data.current.temp_c}deg</span><br />
        </div>
      </div> : ""}
    </div>
  )
}

export default Card
