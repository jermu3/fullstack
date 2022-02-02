import React, { useState } from 'react'

const Header = ({otsikko}) => {
  return (
    <div>
      <h1>{otsikko}</h1>
    </div>
  )
}

const Button = ({nimi, klik}) => {
  return (
    <button onClick={klik}>{nimi}</button>
  )
}

const Anecdote = ({texti, aanet}) => {
  return (
    <div>
      <div>
        {texti}
      </div>
      <div>
        has {aanet} votes
      </div>
    </div>
  )
}

const MostVoted = ({texti, aanet}) => {
  return (
    <div>
      <div>
        {texti}
      </div>
      <div>
        has {aanet} votes
      </div>
    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const hedu = 'Anecdote of the day'
  const hedu2 = 'Anecdote with most votes'

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])
  const [mostVoted, setMostVoted] = useState(0)
  const [lemppari, setLemppari] = useState(0)

  const addVote = () => {
    let newVotes = [...votes]
    newVotes[selected] = newVotes[selected]+1
    setVotes(newVotes)
    if (newVotes[selected] > mostVoted) {
      setMostVoted(newVotes[selected])
      setLemppari(selected)
    }
  }

  return (
    <div>
      <div><Header otsikko = {hedu}/></div>
      <div>
        <Button nimi = {'vote'} klik = {() => addVote()}/>
        <Button nimi = {'next anecdote'} klik = {() => setSelected(Math.floor(Math.random() * 7))}/>
      </div>
      <div>
        <Anecdote texti = {anecdotes[selected]} aanet = {votes[selected]}/>
      </div>
      <div><Header otsikko = {hedu2}/></div>
      <div>
        <MostVoted texti = {anecdotes[lemppari]} aanet = {mostVoted}/>
      </div>
    </div>
  )
}

export default App