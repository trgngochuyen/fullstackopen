import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const [weather, setWeather] = useState('')
    // Effect for Weather data
    useEffect(() => {
        // Construct the API url to call
        let isSubscribed = true
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=6915883027a42f5fcc617f190a6feff6"
        
        //Call the API, and set the state of the weather forecast
        axios.get(url).then(response => {
            if (isSubscribed) {
                setWeather(response.data)
        }}).catch(ex => console.error(ex))
    return () => isSubscribed = false
})
    return (
        <>
        <WeatherDisplay weather={weather} />
        </>
    )
}

const WeatherDisplay = ({ weather }) => {
    if (! weather ) {
        return (
            <div></div>
        )
    }
    return (
            <div>
                <h2>Weather in {weather.name}</h2>
                <p><b>Temperature:</b> {weather.main.temp} &#8451;</p>
                <p><b>Description:</b> {weather.weather[0].main} | {weather.weather[0].description} | {weather.weather[0].icon}</p>
                <p><b>Wind:</b> {weather.wind.speed} m/s</p>
            </div>
        )
    }

export default Weather