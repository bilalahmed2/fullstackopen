import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const selectAnecdote = () => {
    let randomNumber = Math.round((anecdotes.length - 1) * Math.random())
    setSelected(randomNumber)
  }

  const voteAnecdote = (number) => {
    let copy = { ...votes }
    copy[number] += 1
    setVotes(copy)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })

  let maxVoted = 0;
  let maxIndex = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i] >= maxVoted) {
      maxVoted = votes[i]
      maxIndex = i
    }
  }

  return (
    <div>

      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br></br>
      <button onClick={selectAnecdote}>next anecdote</button>
      <button onClick={() => voteAnecdote(selected)}>vote</button>

      <h1>anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]} <br></br>has {maxVoted} votes</p>
    </div>
  )
}

export default App