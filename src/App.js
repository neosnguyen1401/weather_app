import React, {useState} from "react";
import axios from "axios";

import rainLogo from './assets/rain.png';
import hazeLogo from './assets/haze.png';
import clearLogo from './assets/clear.png';
import cloudLogo from './assets/cloud.png';
import coldLogo from './assets/cold.png';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5e13f54d5ec3a305660d5ce0cdc02089`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const renderLogo = (weather) => {
    switch (weather) {
      case 'Rain':
        return <img src={rainLogo} alt='rain_logo' />
      case 'Haze':
        return <img src={hazeLogo} alt='haze_logo' />
      case 'Clear':
        return <img src={clearLogo} alt='clear_logo' />
      case 'Clouds':
        return <img src={cloudLogo} alt='cloud_logo' />
      case 'Cold':
        return <img src={coldLogo} alt='cold_logo' />
      default:
        return <img src={clearLogo} alt='weather_logo' />
  }
  }

  return (
    <div className="app box-border p-0 m-0 w-full h-screen relative text-white">
      <div className="search text-center p-6">
        <input className="p-4 w-1/2 text-center text-lg rounded-full border-solid border-2 border-white bg-white/25 placeholder:text-white"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Your City Name'
          type='text'
        />
      </div>

      <div className="container max-w-screen-md h-5/6 m-auto px-0 py-1 relative top-10 flex flex-col justify-between">
        <div className="top w-full mx-auto ">
          <p className="text-2xl font-bold text-center hover:skew-x-12 ease-in duration-300">{data.name}</p>
        </div>

        <div className="mid flex justify-center h-auto w-full hover:scale-125 ease-in duration-300">
        {data.weather ? renderLogo(data.weather[0].main) : null}
        </div>

        <div className="bot flex flex-row justify-evenly items-center w-full mx-auto my-4 px-6 py-4 rounded-3xl bg-white/25">
          <div className="temperature">
            {data.main ? <h1 className='text-xl font-bold hover:scale-125 ease-in duration-300'>{((data.main.temp-32)/1.8).toFixed()}°C</h1> : null}            
          </div>

          <div className="seperator border-r-4 border-solid border-white relative top-0 h-full m-2"></div>

          <div className="weather">
            <div>
              {data.weather ? <p className="text-base hover:-translate-y-4 ease-in duration-300">{data.weather[0].main}</p> : null}
            </div>

            <div>
            {data.weather ? <p className="text-base hover:translate-y-4 ease-in duration-300">{data.weather[0].description}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
