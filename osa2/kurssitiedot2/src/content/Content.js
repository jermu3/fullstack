import React from 'react'
import Part from './Part.js'

const Content = (props) => {
    return (
      <div>
        {props.parts.map(element => 
          <Part key={element.id} part={element.name} exercises={element.exercises}/>
        )}
      </div>
    )
  }

export default Content