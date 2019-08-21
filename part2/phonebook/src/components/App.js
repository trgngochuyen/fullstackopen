import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SearchFilter = ({newSearch, handleSearch}) => {
    return (<div>filter shown with <input value={newSearch} onChange={handleSearch} /></div>)
}
const NameForm = ({submitInput, newName, handleNameInput, newNb, handleNbInput}) => {
    return (
        <form onSubmit={submitInput}>
            <div>
                name: <input value={newName} onChange={handleNameInput} />
            </div>
            <div>number: <input value={newNb} onChange={handleNbInput}/></div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )

}
const SearchDisplay = ({persons, newSearch}) => {
    const displayPersons = persons.filter(person => {
        return person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
    })
    return (
        <div>{displayPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
            }</div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNb, setNewNb] = useState('')
    const [newSearch, setSearch] = useState('')

    useEffect(() => {
        console.log('effect')
        axios.get(' http://localhost:3001/persons').then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
    }, [])
    const submitInput = (event) => {
        event.preventDefault()
        const nameList = persons.map(person => person.name)
        const nameObject = {
            name: newName,
            number: newNb
        }
        if (nameList.includes(newName)) {
            alert(newName + ' is already added to phonebook')
            setNewName('')
            setNewNb('')
        } else {
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNb('')
        }
    }

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }
    const handleNbInput = (event) => {
        setNewNb(event.target.value)
    }
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <SearchFilter newSearch={newSearch} handleSearch={handleSearch} />
            <h2> Add a New</h2>
            <NameForm submitInput={submitInput} newName={newName} handleNameInput={handleNameInput} newNb={newNb} handleNbInput={handleNbInput} />
            <h2>Numbers</h2>
            <SearchDisplay persons={persons} newSearch={newSearch} />
        </div>
    )
}

export default App