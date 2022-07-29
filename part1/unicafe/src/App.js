import { useState } from 'react'


const Title = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ statistics }) => {
  if (statistics.goodScore + statistics.neutralScore + statistics.badScore === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={statistics.goodScore} />
        <StatisticsLine text="neutral" value={statistics.neutralScore} />
        <StatisticsLine text="bad" value={statistics.badScore} />
        <StatisticsLine text="all" value={statistics.goodScore + statistics.neutralScore + statistics.badScore} />
        <StatisticsLine text="average" value={(statistics.goodScore + statistics.neutralScore + statistics.badScore) / 3} />
        <StatisticsLine text="positive" value={(statistics.goodScore * 100) / (statistics.goodScore + statistics.neutralScore + statistics.badScore)} />
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    goodScore: good,
    badScore: bad,
    neutralScore: neutral
  }

  return (
    <>
      <Title text={"give feedback"} />
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Title text={"statistics"} />
      <Statistics statistics={statistics} />
    </>
  )
}

export default App