import React from "react";

const Tehtavia = ({taulu}) => {
    const tehtavat = taulu.map(element => element.exercises)
    return (
      <div>
        <b>total of {tehtavat.reduce((edellinen, nyt) => edellinen + nyt,0)} exercises</b>
      </div>
    )
  }

export default Tehtavia