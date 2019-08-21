import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const ShowOneCountry = ({countries, search}) => {
    const resultList = countries.filter(country => {
        return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    const showOneCountry = () => (resultList.map(result => {
        return ( 
            <div key={result.name}>
                <h1>{result.name}</h1>
                <p>Capital: {result.capital}</p>
                <p>Population: {result.population}</p>
                <h2>Languages</h2>
                <ul>
                    {result.languages.map(language => {
                    return(<li key={language.name}>{language.name}</li>)})}
                </ul>
                <img src={result.flag} style={{width: 150 + 'px'}} alt={result.name}></img>
                <Weather city={result.capital}/>        
            </div>
        )}))
        
    return (
        showOneCountry()
    )
}
const ResultDisplay = ({countries, search, setSearch}) => {
    const resultList = countries.filter(country => {
        return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    
    const handleShowButton = (event) => {
        event.preventDefault()
        setSearch(event.target.parentNode.firstChild.innerText)
        console.log(event.target.parentNode.firstChild.innerText)
        return (
            <ShowOneCountry countries={countries} search={search} />
        )
    }

    if (search === '') {
        return (
            <p>Throw me a country name!</p>
        )
    } else if (resultList.length>= 10) {
        return (
            <p>Too many matches, specify your filter</p>
        )
    } else if (resultList.length > 1) {
        return (
            <div>{resultList.map(result => {
            return (
                <form key={result.name}>
                    <p key={result.name}>{result.name}</p>
                    <button onClick={handleShowButton}>show</button>
                </form>
                )
        })}</div>
        )
    } else {
        return (   
            <ShowOneCountry countries={countries} search={search} />
        )
    }
}
const SearchBar = ({search, handleSearch}) => {
    return (
        <div>
                Find countries <input value={search} onChange={handleSearch} />
        </div>
    )
}

const Weather = ({city}) => {
    const [weather, setWeather] = useState('')
    const controller = new AbortController()
    const signal = controller.signal
    // Effect for Weather data
    useEffect(() => {
        // Construct the API url to call
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=6915883027a42f5fcc617f190a6feff6"
        
        //Call the API, and set the state of the weather forecast
        axios.get(url, {signal: signal}).then(response => {
            setWeather(response.data)
    }
    ).catch(ex => console.error(ex))
    return () => controller.abort()
    
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
    


const App = () => {
    const [search, setSearch] = useState('')
    const [countries, displayCountries] = useState([])
    

    // Effect for Countries data
    useEffect(() => {
        console.log('effect')
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            console.log('promise fulfilled')
            displayCountries(response.data)
        })
    }, [])
    
    
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    
    return (
        <>
            <SearchBar search={search} handleSearch={handleSearch} />
            <ResultDisplay countries={countries} search={search} setSearch={setSearch}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));