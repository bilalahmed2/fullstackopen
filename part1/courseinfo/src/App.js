const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )

}

const Part = (props) => {
  return (
    <p>{props.part} {props.excercise}</p>
  )
}

const Content = (props) => {
  
 return (
  <div>
  <Part part = {props.part[0].name} excercise = {props.part[0].excercise} />
  <Part part = {props.part[1].name} excercise = {props.part[1].excercise} />
  <Part part = {props.part[2].name} excercise = {props.part[2].excercise} />

  </div>
 )
}

const Total = (props) => {
  return (
    <p>Number of excercises {props.part[0].excercise + props.part[1].excercise + props.part[2].excercise}</p>


  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',

   parts : [
    {
      name: 'Fundamentals of React',
      excercise: 10
    },

    {
      name: 'Using props to pass data',
      excercise: 7
    },

    {
      name: 'State of a component',
      excercise: 14
    }
  ]
  }



  return (
    <div>
      <Header course = {course.name}/>
      <Content part = {course.parts} />
      <Total part = {course.parts} />
      </div>
  )
}

export default App