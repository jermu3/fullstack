import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({haku, value, onChange, filter, data}) => {
  return (
    <div>
      <div>
        Find countries
        <input
          value={value}
          onChange={onChange}
        />
      </div>
      <div>
        <Maat haku={haku} filter={filter} data={data}/>
      </div>
    </div>
  )
}

const Maat = ({haku, data, filter}) => {
  if (filter.length == 1) {
    return (
      <div>
        <h2>{filter}</h2>
        <div>
          <HaeTiedot nimi={filter[0]} data={data}/>
        </div>
      </div>
    )
  } else if (filter.length < 11) {
    return (
      <div>
        {filter.map(element => 
          <Maa key={element} haku={haku} nimi={element}/>)}
      </div>
    )
  }
  return (
    <div>Too many matches, specify another filter</div>
  )
}

const Maa = ({haku, nimi}) => {
  const handleButton = (event) => {
    event.preventDefault()
    haku(nimi)
  }
  return (
      <form onSubmit={handleButton}> 
        {nimi}
        <button type="submit">show</button>
      </form>
  )
}

const HaeTiedot = ({nimi, data}) => {
  console.log(nimi)
  const element = data.filter(element => element.name.common == nimi)
  return (
    <div>
      <h5>{element[0].name.official}</h5>
      <div>capital: {element[0].capital}</div>
      <div>population: {element[0].population}</div>
      <div>
        <h4>languages:</h4>
        <HaeKielet kielet={element[0].languages}/>
      </div>
      <div><img src={element[0].flags.png} /></div>
    </div>
  )
}

const HaeKielet = ({kielet}) => {
  const kielet2 = []
  console.log(kielet)
  for (var kieli in kielet) {
  	console.log(kielet[kieli])
    kielet2.push(kielet[kieli])
  }
  return (
    <div>
      <ul>
        {kielet2.map(kieli => <li key={kieli}>{kieli}</li>)}
      </ul>
    </div>
  )
}


const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const filteredCountries = data.map(element => element.name.common).filter(element => element.toLowerCase().includes(filter.toLowerCase()))


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const notes = response.data
        setData(notes)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
        <Filter haku={setFilter} value={filter} onChange={handleSearch} filter={filteredCountries} data={data}/>
    </div>
  )
}

export default App