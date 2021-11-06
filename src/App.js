import React, { useState } from "react";
import './App.css';
import MapPage from './components/MapPage';
import './App.css';
import "ol/ol.css";
import { fromLonLat } from "ol/proj";

function App() {

  // const [center, setCenter] = useState([135.5171123360051, 34.67131543707352]);
  // const [center, setCenter] = useState([0, 0]);
  // const [center, setCenter] = useState([139.767, 35.681]);
  const [center, setCenter] = useState([135.4887893,34.70830982]);
  return (
    <div className="App">
      おはよう
      <MapPage
            center={fromLonLat(center)}
      />
    </div>
  );
}

export default App;
