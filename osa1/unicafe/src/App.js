import React, { useState } from 'react'

const Header = ({otsikko}) => {
  return (
    <div>
      <h1>{otsikko}</h1>
    </div>
  )
}

const Stats = (props) => {
  let all = props.good + props.neutral + props.bad
  let avg = (props.good - props.bad)/all
  let pos = props.good/all
  if (all == 0) {
    return (<div>No feedback given</div>)
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{pos*100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({nimi, klik}) => {
  return (
      <button onClick={klik}>{nimi}</button>
  )
}


const App = () => {
  const hedu = 'give feedback'
  const hedu2 = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <Header otsikko = {hedu}/>
      <Button nimi = {'good'} klik = {() => setGood(good + 1)}/>
      <Button nimi = {'neutral'} klik = {() => setNeutral(neutral + 1)}/>
      <Button nimi = {'bad'} klik = {() => setBad(bad + 1)}/>
      <Header otsikko = {hedu2}/>
      <Stats good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App