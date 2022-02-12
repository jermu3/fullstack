import React from "react";
import Course from "./Course.js";
import Tehtavia from "./Tehtavia.js";

const Courses = ({course}) => {
    return (
      <div>
        <Course course = {course}/>
        <Tehtavia taulu={course.parts} />
      </div>
    )
  }

export default Courses