const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Adaa Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get('/api/persons', morgan('tiny'), (request, response) => {
  response.json(persons)
})

app.get('/info', morgan('tiny'), (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people. \n
    ${new Date().toString()}`)
})

app.get('/api/persons/:id', morgan('tiny'), (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(x => x.id === id)
  response.json(person)

})

app.delete('/api/persons/:id', morgan('tiny'), (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()

})

const createId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
  return maxId + 1
}

app.post('/api/persons', morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}), (request, response) => {

  const body = request.body

  if (!body.name) {
    return response.status(404).json({
      error: "name missing"
    })
  } else if (!body.number) {
    return response.status(404).json({
      error: "number missing"
    })
  } else if (JSON.stringify(persons).includes(JSON.stringify(body.name))) {
    return response.status(400).json({ error: 'name must be unique' }
    )
  }
  let person = { ...body, id: createId() }

  persons = persons.concat(person)
  response.json(persons)

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})