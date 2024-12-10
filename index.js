require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");
const app = express();
const MAX = 1000000;

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  if (error.ErrorMessage === "CastError") {
    return response.status(400).send("malformed request");
  }
};

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

app.get("/api/info", (request, response) => {
  const phonebook = `<div><p>Phonebook has info for ${
    persons.length
  } people</p><p>${new Date()}</p></div>`;
  response.send(phonebook);
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((err) => response.status(204).end())
    .then((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).send({ error: "name is requried" });
  } else if (!body.number) {
    return response.status(400).send({ error: "number is required" });
  } else if (
    Person.find({ name: body.name }).catch((error) => {
      console.log(error.ErrorMessage);
      return response.send({ error: "name must be unique" });
    })
  );

  const person = new Person({
    id: Math.floor(Math.random() * MAX),
    name: body.name,
    number: body.number,
  });
  person.save().then((savedNote) => response.json(person));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const id = request.id;
  const person = { name: body.name, number: body.number };
  Person.findOneAndUpdate(id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
