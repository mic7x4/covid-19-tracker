import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import './App.css';

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries,setContries] = useState([]);
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

  return (
    <div className="app">
     <div className="app__header">
       <h1>COVID-19 TRACKER</h1>
     <FormControl>
    <Select variant="outlined" value="abc">
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
