import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import './App.css';

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries,setContries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useState(() => {
    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        setContries(countries);
      });
    };
    getCountriesData();
  }, []);
const onCountryChange = async (event)=>{
  const countryCode = event.target.value;
  console.log("This is the countrycode "+countryCode);
}
  return (
    <div className="app">
     <div className="app__header">
       <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
    <Select variant="outlined" value={country} onChange={onCountryChange}>
    <MenuItem value="worldwide" >Worldwide</MenuItem>
      {countries.map((country)=>(
         <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
      ))}
    </Select>
     </FormControl>
     </div>
    </div>
  );
}
 
export default App;
