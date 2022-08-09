import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ city }) => {
    let [weather, setWeather] = useState([]);

    useEffect(() => {
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API.toString()}`


        axios.get(weatherUrl).then(response => setWeather(response.data)).catch(e => console.log(e))
    }, [1])

    if (weather.length !== 0) {
        return (
            <>
                <p>temprature {Math.round(weather['main']['temp'] - 273.15)} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather['weather'][0]['icon']}@2x.png`} alt="icon" />
                <p>Weather: {weather['weather'][0]['description']}</p>
            </>
        )
    }
}

export default Weather;