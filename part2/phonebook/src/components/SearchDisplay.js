import React from 'react'
import noteService from '../services/phonebook'

const SearchDisplay = ({persons, newSearch, setPersons}) => {
    const displayPersons = persons.filter(person => {
        return person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
    })
    const handleDel = (event) => {
        const confirm = window.confirm(`Are you sure you want to delete ${event.target.parentNode.id}?`)
        if (confirm) {
            const id = event.target.id
        noteService.remove(id).then(res => {
            setPersons(persons.filter((person) =>{
            return person.id.toString() !== id
            }))    
        })}
            return null
        }
    return (
        <div>{displayPersons.map(person => <p key={person.name} id={person.name}>{person.name} {person.number}  <button id={person.id} key={person.name} onClick={handleDel}>Delete</button></p>)
            }</div>
    )
}

export default SearchDisplay