import React, { useState, useEffect } from 'react'
import noteService from './services/phonebook'
import SearchFilter from './components/SearchFilter'
import NameForm from './components/NameForm'
import SearchDisplay from './components/SearchDisplay'
import Message from './components/Message'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNb, setNewNb] = useState('')
    const [newSearch, setSearch] = useState('')
    const [newMessage, setMessage] = useState(null)
    const [color, setColor] = useState('')

    // Render all the people in phonebook
    useEffect(() => {
        noteService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    // Display messages and reset newName and newNb
    const displayMessage = (color, message) => {
        setMessage(message)
        setColor(color)
        setTimeout(() => {setMessage(null)}, 5000)
        setNewName('')
        setNewNb('')
    }

    // Handle input submission
    const submitInput = (event) => {
        event.preventDefault()
        const nameList = persons.map(person => person.name)
        const numberList = persons.map(person => person.number)
        const idList = persons.map(person => person.id)
        const nameObject = {
            name: newName,
            number: newNb
        }
        console.log(idList)
        const personIndex = nameList.indexOf(newName)
        // Logic handling names and numbers
        if (nameList.includes(newName)) {
            if (numberList[personIndex] !== newNb) {
                const changeNbConfirm = window.confirm(newName + ' is already added to phonebook. Do you want to replace the old number with the new one?')
                if (changeNbConfirm) {
                    noteService.update(idList[personIndex], {...nameObject, number: newNb}).then(res => {
                        // Update number of the person
                        persons[personIndex] = res.data
                        setPersons(persons)
                        displayMessage('green', `New number ${newNb} is saved to name ${newName}`)
                    }).catch(err => {
                        // When name and number no longer exist
                        console.log(err)
                        displayMessage('red', `Sorry, name ${newName} was removed from phonebook.`)
                        setPersons(persons.filter((person) =>{
                            return person.id !== idList[personIndex]
                            }))
                    })
                } return null
            } else if (numberList[personIndex] === newNb) {
                // When the name and number already exist
                alert(`${newName} and the number ${newNb} is already added to phonebook`)
            }
        } else if(nameList.indexOf(newName) === -1) {
                // When the name is new
                noteService.create(nameObject).then(response => {
                    console.log(response)
                    setPersons(persons.concat(response.data))
                    displayMessage('green', `New number ${newNb} is saved to name ${newName}`)
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
            <Message message={newMessage} color={color}/>
            <SearchFilter newSearch={newSearch} handleSearch={handleSearch} />
            <h2> Add a New</h2>
            <NameForm submitInput={submitInput} newName={newName} handleNameInput={handleNameInput} newNb={newNb} handleNbInput={handleNbInput} />
            <h2>Numbers</h2>
            <SearchDisplay persons={persons} newSearch={newSearch} setPersons={setPersons}/>
        </div>
    )
}

export default App