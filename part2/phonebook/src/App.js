import axios from "axios";
import { useState, useEffect } from "react";

const Filter = ({ newSearch, filter }) => (
  <form>
    <div>
      filter show with: <input value={newSearch} onChange={filter} />
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
          type="tel"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Display = ({ name }) => (
  <p>
    {name.name} {name.number}
  </p>
);
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [newSearch, setNewSearch] = "";

  const hook = () => {
    axios.get("http://localhost:3001/persons").then(((response) => {
     setPersons(response.data)
    }))
  }
  useEffect(hook, [])

  const addValues = (event) => {
    event.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
    };

    if (JSON.stringify(persons).includes(JSON.stringify(nameObj.name))) {
      alert(nameObj.name + " is already added to the phonebook");
    } else {
      setPersons(persons.concat(nameObj));
      setNewName("");
      setNewNumber("");
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
    setPersons(filtered);
  };
  return (
    <div>
      <h2>Phonebook:</h2>
      <Filter newSearch={newSearch} filter={filter} />

      <h2>add a new</h2>
      <AddContacts
        addValues={addValues}
        handleChange={handleChange}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {persons.map((name, i) => (
        <Display key={i} name={name} number={name} />
      ))}
    </div>
  );
};

export default App;
