import React, { useEffect, useState } from 'react'

const useFetch = (location, api_key) => {
  const [weather, setWeather] = useState([]);
  let api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`;
  let data = [];

  useEffect(()=>{
    fetch(api_url).then((res) => res.json()).then((data) => setWeather(data));
    console.log(api_url);
  }, [location, api_key])

  return [weather];
}

export default useFetch
