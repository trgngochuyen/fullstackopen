import React from 'react'
import Weather from './Weather'

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

export default ShowOneCountry