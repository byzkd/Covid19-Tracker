import React, { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './components/LineGraph';
import CovidSummary from './components/CovidSummary';
import axios from './axios';
import 'antd/dist/antd.css';
function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState('')
  const [covidCountAr, setCovidCountAr] = useState([]);
  const [label, setlabel] = useState([])

//ComponentDidMount
  useEffect(() => {

    setLoading(true);
    axios.get(`/summary`)
    .then(res => {
      setLoading(false);
      if (res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed)
        setTotalRecovered(res.data.Global.TotalRecovered)
        setTotalDeaths(res.data.Global.TotalDeaths)
        setCovidSummary(res.data);

      }
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })

  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  }
  const countryHandler = (e) => {
    setCountry(e.target.value)
    const d = new Date();
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - days));

    getCovidReportByDateRange(e.target.value, from, to )
  }

  const daysHandler = (e) => {
    setDays(e.target.value)
    const d = new Date();
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    getCovidReportByDateRange(country, from,to)

  }

  const getCovidReportByDateRange = (countrySlug, from, to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      console.log(res)

      const yAxisCovidCount = res.data.map(d => d.Cases)
      const xAxisLabel = res.data.map(d => d.Date)
      const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug)

      setCovidCountAr(yAxisCovidCount)
      setTotalConfirmed(covidDetails.TotalConfirmed)
      setTotalRecovered(covidDetails.TotalRecovered)
      setTotalDeaths(covidDetails.TotalDeaths)
      setlabel(xAxisLabel)

      
    })
    .catch(error => {
      console.log(error);
    })

  }

  // if (loading) {
  //   return <p>Fethcing data from api...</p>
  // }
  return (
    <div className="App" >
     <CovidSummary 
     totalConfirmed = {totalConfirmed}
     totalRecovered = {totalRecovered}
     totalDeaths = {totalDeaths}
     country = {country}
     />
     <div >
       <select  value = {country} onChange = {countryHandler} style = {{marginRight: '10px', marginTop: '20px'}}>
         <option value= ''>Ülke Seçin</option>
         {
           covidSummary.Countries && covidSummary.Countries.map(country => 
           <option key = {country.Slug} value = {country.Slug}>{country.Country}</option>
           )
         }
       </select>
       <select style = {{ marginTop: '20px'}} value = {days} onChange = {daysHandler}>
         <option value = {'7'}>Son 7 gün</option>
         <option value = {'30'}>Son 30 gün</option>
         <option value = {'90'}>Son 90 gün</option>

       </select>
     </div>
     <LineGraph 
     yAxis = {covidCountAr} label = {label}/>
    </div>
  );
}

export default App;
