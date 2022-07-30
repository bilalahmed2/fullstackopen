
const Header = ({ heading }) => <h1>{heading}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>


const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Total = ({ parts }) => <p><strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>




const Course = ({ course }) => {
    return (
        <>
            <Header heading={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course