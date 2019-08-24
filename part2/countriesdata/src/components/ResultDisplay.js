import React from 'react'
import ShowOneCountry from './ShowOneCountry'

const ResultDisplay = ({countries, search, setSearch}) => {
    const resultList = countries.filter(country => {
        return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    
    const handleShowButton = (event) => {
        event.preventDefault()
        setSearch(event.target.parentNode.id)
        return (
            <ShowOneCountry countries={countries} search={search} />
        )
    }
    // Logic on displaying search result
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
                    <p id={result.name} key={result.name}>{result.name} <button onClick={handleShowButton}>show</button></p>
                )
        })}</div>
        )
    } else {
        return (   
            <ShowOneCountry countries={countries} search={search} />
        )
    }
}

export default ResultDisplay