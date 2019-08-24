import React from 'react'

const SearchBar = ({search, handleSearch}) => {
    return (
        <div>
                Find countries <input value={search} onChange={handleSearch} />
        </div>
    )
}

export default SearchBar