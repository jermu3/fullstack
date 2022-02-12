import React, {useState, useEffect} from 'react'
import noteService from './services/notes'

const Names = ({filteredPersons, persons, setPersons, setMessage}) => {
  return (
    <div>
      {filteredPersons.map(element =>
        <Contact key={element.name} person={element} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      )}
    </div>
  )
}

const Contact = ({person, persons, setPersons, setMessage}) => {
  let success = 1
  const poista = async (event) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      event.preventDefault()
      await noteService.poista(person.id).catch(error => {
        console.log('vituiks meni')
        success = 0
        setMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      if (success === 1) {
        setPersons(persons.filter(personObject => personObject.id !== person.id))
        setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      }
      success = 1
    }
  }
  return (
    <div>
      {person.name} {person.number}
      <button type="submit" onClick={poista}>poista</button>
    </div>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Notification = ({nimi}) => {
  if (nimi === null) {
    return (null)
  }
  return (
    <div className="error">
      {nimi}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const contactsToShow = persons.filter(element => element.name.toLowerCase().includes(newFilter.toLowerCase()))
  const [message, setMessage] = useState(null)

  useEffect(async() => {
    const {data} = await noteService.getAll()
    setPersons(data)
  }, [])

  useEffect(async() => {
    const {data} = await noteService.getAll()
    setPersons(data)
  }, [persons])

  const addPerson = async (event) => {
    event.preventDefault()
    const names = persons.map(element => element.name)
    const numbers = persons.map(element => element.number)
    let noteObject
    let success = 1
    if (numbers.includes(newNumber)) {
      window.alert(`${newNumber}  is already added to phonebook`)
    } else if(names.includes(newName)){
      if (window.confirm(`${newName}  is already added to phonebook, replace the old number with new one?`)) {
        noteObject = {
        name: newName,
        number: newNumber
        }
        const newPersons = persons.map(person => person.name === newName ? person = noteObject : person)
        await noteService.update(persons.find(person =>
          person.name === newName).id, noteObject).catch(error => {
          console.log('vituiks meni')
          success = 0
          setMessage(`Information of ${noteObject.name} has already been removed from the server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        if (success === 1) {
          setPersons(newPersons)
          setMessage(`Updated ${noteObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        success = 1
        setNewName('')
        setNewNumber('')
      }
    } else {
      noteObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(noteObject))
      noteService.create(noteObject)
      setMessage(`Added ${noteObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification nimi={message}/>
      <form>
        <div>
          <Filter value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <div>
        <h2>add a new</h2>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number: 
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names filteredPersons={contactsToShow} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App