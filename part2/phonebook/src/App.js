import axios from "axios";
import { useState, useEffect } from "react";
import getPersons from './services/persons'


const SuccessMessage = ({ message }) => {
  if (message == null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message == null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Filter = ({ filter }) => (
  <form>
    <div>
      filter show with: <input onChange={filter} />
    </div>
  </form>
);
const AddContacts = ({
  addValues,
  handleChange,
  handleChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addValues}>
      <div>
        name: <input value={newName} onChange={handleChange} required />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={handleChangeNumber}
          required
          type="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Display = ({ persons, filtered, removeEntry }) => {
  if (filtered.length === 0) {
    return (
      <ul>
        {persons.map((x, i) => <li key={i}>{x.name} {x.number} <button onClick={() => removeEntry(x.id)}>delete</button></li>)}
      </ul>
    )
  } else {
    return (
      <ul>
        {filtered.map((x, i) => <li key={i}>{x.name} {x.number} <button onClick={() => removeEntry(x.id)}>delete</button></li>)}
      </ul>
    )
  };
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");
  const [filteredSelection, updateFilterSelection] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const hook = () => {
    getPersons.getAll().then(persons => setPersons(persons))

  }
  useEffect(hook, [persons.length])
  useEffect(hook, [])
  const removeEntry = (personId) => {
    if (window.confirm("Do you really want to delete the entry?")) {
      getPersons.deleteEntry(personId).then(() => {
        setPersons(persons.filter(x => x.id !== personId))
      }).catch(error => {
        setErrorMessage(`Contact doesn't exist in database. It may have already been deleted.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }
  const addValues = (event) => {
    event.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
    };

    if (JSON.stringify(persons).includes(JSON.stringify(nameObj.name)) && JSON.stringify(persons).includes(JSON.stringify(nameObj.number))) {
      alert(`${nameObj.name} is already added with the number: ${nameObj.number}`);
    } else if (JSON.stringify(persons).includes(JSON.stringify(nameObj.name))) {
      if (window.confirm(`${nameObj.name} is already added to the phonebook. Do you want to update the number?`)) {
        const personToUpdate = persons.find(x => x.name === nameObj.name)
        const changedPerson = { ...personToUpdate, number: nameObj.number }
        getPersons.updateEntry(persons, changedPerson).then(response => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
          setNewName("")
          setNewNumber("")
        })
      }
    }

    else {

      getPersons.create(nameObj).then(response => {
        setPersons(persons.concat([response]));
        console.log(persons)
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`${nameObj.name} was added to the database.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  };
  const handleChange = (event) => setNewName(event.target.value);
  const handleChangeNumber = (event) => setNewNumber(event.target.value);
  const filter = (event) => {
    let filtered = persons.filter((x) => {
      if (
        JSON.stringify(x)
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return x;
      }
    });
    updateFilterSelection(filtered);
  };
  return (
    <div>
      <h2>Phonebook:</h2>
      <Filter filter={filter} />

      <h2>add a new</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <AddContacts
        addValues={addValues}
        handleChange={handleChange}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Display persons={persons} filtered={filteredSelection} removeEntry={removeEntry} />
    </div>
  );
};

export default App;
