import React, { useState, useEffect } from 'react'
import noteService from './services/phonebook'
import SearchFilter from './components/SearchFilter'
import NameForm from './components/NameForm'
import SearchDisplay from './components/SearchDisplay'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNb, setNewNb] = useState('')
    const [newSearch, setSearch] = useState('')

    useEffect(() => {
        noteService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])
    const submitInput = (event) => {
        event.preventDefault()
        const nameList = persons.map(person => person.name)
        const numberList = persons.map(person => person.number)
        const nameObject = {
            name: newName,
            number: newNb
        }
        const personIndex = nameList.indexOf(newName)
        if (nameList.includes(newName) && numberList[personIndex] !== newNb) {
            const changeNbConfirm= window.confirm(newName + ' is already added to phonebook. Do you want to replace the old number with the new one?')
            if (changeNbConfirm) {
                noteService.update(personIndex+1, {...nameObject, number: newNb}).then(res => {
                    persons[nameList.indexOf(newName)] = res.data
                    setPersons(persons)
                    setNewName('')
                    setNewNb('')
                })
            } return null
        } else if (nameList.includes(newName) && numberList[personIndex] === newNb) {
            alert(`${newName} and the number ${newNb} is already added to phonebook`)
            setNewName('')
            setNewNb('')
        } else {
            noteService.create(nameObject).then(response => {
                console.log(response)
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNb('')
            })
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
            <SearchDisplay persons={persons} newSearch={newSearch} setPersons={setPersons}/>
        </div>
    )
}

export default App