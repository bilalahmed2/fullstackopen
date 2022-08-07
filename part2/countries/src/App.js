import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ matchingCountries, displayCountries }) => {
  if (matchingCountries.length === 0) {
    return (
      <p>Enter a search query.</p>
    )
  } else if (matchingCountries.length === 1) {
    let languageKeys = Object.keys(matchingCountries[0].languages)
    console.log(languageKeys)
    return (
      <div>
        <h1>{matchingCountries[0].name.common}</h1>
        <p>capital {matchingCountries[0].capital}</p>
        <p>area {matchingCountries[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {languageKeys.map((x,i) => <li key={i}>{matchingCountries[0].languages[x]}</li>)}
        </ul>
        <img src={matchingCountries[0].flags.png} />
      </div>
    )
  } else if (matchingCountries.length <= 20) {
    return (<>
      {matchingCountries.map((x, i) => <p key={i}>{x.name.common} <button onClick={() => displayCountries(x.name.common)}>show</button></p>)}
    </>
    )
  } else if (matchingCountries.length > 20) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

}

const App = () => {
  const [countries, changeCounteries] = useState([]);
  const [matchingCountries, changeMatchingCountries] = useState([]);

  const hook = () => {

    let data = axios.get("https://restcountries.com/v3.1/all")
    data.then(r => changeCounteries(r.data))
  };

  useEffect(hook, []);

  const handleChange = (e) => {
    //    displayCountries(e.target.value, countries);
    if (countries.length !== 0) {
      displayCountries(e.target.value, countries);

    }

    console.log(matchingCountries)
  };



  const displayCountries = (inputValue, countriesList = countries) => {
    // let matched = []
    // for (let i = 0; i < countriesList.length; i++) {
    //   if (
    //     countriesList[i].name.common
    //       .toLowerCase()
    //       .includes(inputValue.toLowerCase())
    //   ) {
    //     // console.log(countriesList[i].name.common, countriesList[i].flags.png);
    //     matched.push(countriesList[i])
    //   }
    // }
    // console.log(matched)

    changeMatchingCountries(
      countriesList.filter((element) => {
        return element.name.common
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      })
    )
  }




  return (
    <>
      <div>
        find countries: <input type="text" onChange={handleChange} />
      </div>
      <Display matchingCountries={matchingCountries} displayCountries={displayCountries} />
    </>
  );
};
export default App;
