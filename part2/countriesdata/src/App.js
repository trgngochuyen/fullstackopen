import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ResultDisplay from './components/ResultDisplay'

    


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


export default App;
