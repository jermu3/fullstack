import React from 'react'

const App = (props) => {
  const { notes } = props
  const result = notes.map(note => note.id)
  console.log(result)

  return (
    <div>
      <h1>Notes</h1>
      <ol>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>)}
      </ol>
      
    </div>
    
  )
  
}

export default App