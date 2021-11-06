import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from "ol/proj";
import { vectorLayer } from '../js/layers';

const MapPage = ({center}) => {

    const [ map, setMap ] = useState()

    const mapElement = useRef()
    const mapRef = useRef()
    mapRef.current = map
    const zoom = 14;
    // const zoom = 2;
    // let osmSource = OSM();
  console.log(center)
    useEffect( () => {
      const initialMap = new Map({
        target: mapElement.current,
        layers: [
          
          new TileLayer({source: new OSM()}),
          vectorLayer
          
        ],
        view: new View({
          projection: 'EPSG:3857',
          center:center,
          zoom: zoom
        }),
      })
    
      setMap(initialMap)
  
    },[])


    return (
        <div>
            <div ref={mapElement} className="map-container"></div>
        </div>
    );
}

export default MapPage;