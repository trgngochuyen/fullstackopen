import React from 'react'

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}
const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
const Content = ({ course }) => {
    const eachCourseParts = course.parts.map(part => <Part key={part.id} part={part} />)
    return (
        <div>{eachCourseParts}</div>
    )
}

const Total = ({ course }) => {
    const exercisesEachPart = course.parts.map(part => part.exercises)
    const sum = exercisesEachPart.reduce((total, exercise) => total + exercise, 0)
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}
const EachCourse = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />

        </div>
    )
}
const Course = ({ courses }) => {
    const eachCourse = () => courses.map(course => <EachCourse key={course.id} course={course} />) 
    return (
      <div>
          <h1>Web development curriculum</h1>
            {eachCourse()}
      </div>
  )
}

export default Course