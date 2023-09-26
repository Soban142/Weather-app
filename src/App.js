import logo from './logo.svg';
import './App.css';
import rain from './assests/rain.png'
import cloud from './assests/cloud.png'
import haze from './assests/haze.png'
import clear from './assests/clear.png'
import rainVideo from './assests/rainVideo.mp4'
import {useEffect, useState} from 'react'

function App() {

  let [ cityQuery, setCityQuery ] = useState('karachi');
  let [ cityData, setCityData  ] = useState(null);
   
  const weatherData = async () => {
    try {
      const weatherApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=e9c265a3b61aa1bc3c99ec6e09dba50a`);
      const apiRes = await weatherApi.json();
      setCityData(apiRes)
      return apiRes;
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(cityData.weather[0]?.main)
  console.log(cityData?.weather ? cityData : 'thullu')
  
  useEffect( ()=> {
    weatherData()
  }, [cityQuery])

  return (
    <div className="App">
      <div className='weather-app'>
        <video className='weather-video' autoPlay controls loop>
          <source src={rainVideo} type="video/mp4"/>
        </video>
        <div>
          <input  onChange={(e) => setCityQuery(e.target.value)}  className='city-input'/>
        </div>
        <div className='weather'>
          <img src={cityData?.weather ? cityData.weather[0].main === 'Rain' ? rain: cityData.weather[0].main === 'Clear' ? clear: cityData.weather[0].main === 'Haze' ? haze : cityData.weather[0].main === 'Clouds' ? cloud : '' : ''} className='current-weather-img'/>
          <div>
            <h2 style={{margin: 0,}}>{Math.round(cityData?.main?.temp - 273.15)} °C</h2>
          </div>
          <h4 className='current-weather-state'>{cityData?.weather ? cityData.weather[0].main : ''}</h4>
          <div className='weather-conditions-div'>
            <div className=''>Humidity: <span>{cityData?.main?.humidity}%</span></div>
            <div className=''>Pressue: <span>{Math.floor(cityData?.main?.pressure * 0.1)} kPA</span></div>
            <div className=''><span>Average Temp:{Math.round(((cityData?.main?.temp_max + cityData?.main?.temp_min) / 2) - 273.15)}</span></div>
            <div className=''><span>Average Temp:{Math.round(((cityData?.main?.temp_max + cityData?.main?.temp_min) / 2) - 273.15)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
