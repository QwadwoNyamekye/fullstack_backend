const express = require('express')
const app = express()
const MAX = 1000000

app.use(express.json())

const persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const phonebook = `<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`
    response.send(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(n => n.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons.filter(n => n.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).send({ error: 'name is requried' })
    }
    else if (!body.number) {
        return response.status(400).send({ error: 'number is required' })
    }
    else if (persons.find(n => body.name === n.name)) {
        return response.send({ error: 'name must be unique' })
    }
g
    const person = {
        id: Math.floor(Math.random() * MAX),
        name: body.name,
        number: body.number
    }

    response.json(person)

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})