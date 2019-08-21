import React from 'react'

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

export default NameForm