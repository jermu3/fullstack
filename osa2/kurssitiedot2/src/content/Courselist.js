import React from "react";
import Courses from "./Courses.js";

const Courselist = ({courses}) => {
    return (
      <div>
        {courses.map(element => 
          <Courses key={element.id} course={element}/>
        )}
      </div>
    )
  }

export default Courselist