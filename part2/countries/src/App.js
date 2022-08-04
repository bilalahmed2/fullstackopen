import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

const App = () => {
  const [countries, changeCounteries] = useState([]);

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      changeCounteries(response.data);
    });
  };

  useEffect(hook, []);

  const handleChange = (e) => {
    displayCountries(e.target.value, countries);
  };

  const displayCountries = (inputValue, countriesList) => {
    for (let i = 0; i < countriesList.length; i++) {
      if (
        countriesList[i].name.common
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ) {
        console.log(countriesList[i].name.common, countriesList[i].flags.png);
      }
    }
  };

  return (
    <>
      <div>
        find countries: <input type="text" onChange={handleChange} />
      </div>
    </>
  );
};
export default App;
