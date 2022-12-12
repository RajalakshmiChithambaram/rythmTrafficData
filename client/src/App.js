import React from "react";
import "./App.css";
import { useState, useEffect } from 'react';
import LineChart from './LineChart'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Circles } from 'react-loader-spinner'

const App = () => {
  const [movements, setMovementsData] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState('');
  const [chartData, setChartData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {

    //api to retrieve movements list from db and load it into the dropdown
    fetch('/dbData')
      .then((res) => res.json())
      .then((parsedData) => {
        let movementsArray = [];
        for (let movement in parsedData.TMC[0].movements) movementsArray.push(movement)
        setMovementsData(movementsArray)
      })

  }, [])

  const submitCall = () => {
    setShowLoader(true)
    const params = `type=${selectedMovement}`
    fetch(`/api/?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setChartData(data);
        setShowLoader(false)
      })
  }
  const defaultOption = '';
  return (
    <div className="container">
      <h2 className="header2">Rythm - Traffic Data</h2>
      <div className="row">
        <div className="col-sm-6">
          <Dropdown options={movements} onChange={(movement) => setSelectedMovement(movement.value)} value={defaultOption} placeholder="Select the movement type" />
        </div>
        <div className="col-sm-6">
          <button className="btn btn-primary" disabled = {!selectedMovement} onClick={submitCall}>
            Submit
          </button>
        </div>
      </div>
      {showLoader ? 
      <div className="loader"> 
      <Circles
        height="80"
        width="80"
        color="#0d6efd"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        alignItem="center"
      /></div> : ""}
      <div style={{ width: '100%', margin: '0 auto', padding:'2%' }}>
        {chartData.length && showLoader === false ? <LineChart data={chartData} /> : ''}
      </div>
    </div>

  )
}

export default App;