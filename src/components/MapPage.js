import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from "ol/proj";
import { vectorLayer,draw_points_layer, make_draw_points,draw_exe} from '../js/layers';
import {getFeatureClickedMap,dataHandling} from '../js/dataConrtol'



let selected_point = [];
let deleted_point = [];
let json_point_feature = {
  type: "FeatureCollection",
  name: "draw",
  features: [],
};


const MapPage = ({center}) => {

    const [ map, setMap ] = useState()
    const [drawPointsLayer, setDrawPointsLayer] = useState();


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
          vectorLayer,
          draw_points_layer,
          
        ],
        view: new View({
          projection: 'EPSG:3857',
          center:center,
          zoom: zoom
        }),
      })
    
      setMap(initialMap)
      setDrawPointsLayer(draw_points_layer);
  
    },[])

    useEffect(() => {
        if (!map) return;
        map.on("singleclick", handleMapClick);
    });

    const handleMapClick = (e) => {
			console.log('あああ')

			//クリックした箇所でデータが取得できる仕様
			let featurePoint = getFeatureClickedMap(e,map);
			  //featureを取得できなければ以下処理しない
			if (typeof featurePoint === "undefined") {
				console.log("クリックした箇所でfeatureは取得できません");
				return;
			}

//選択点（クリックしたボーリング）よりjson_comd,json_delete作成
[selected_point, deleted_point] = dataHandling(e, featurePoint, selected_point, deleted_point);
			console.log('８８８')


    //json_comdをナンバリング順に並び替える
    selected_point.sort(function (a, b) {
      if (a.num < b.num) return -1;
      if (a.num > b.num) return 1;
      return 0;
    });
console.log(selected_point)
    //選択点描画
    if (selected_point.length > 0) {
      let json_point_feature = {
        type: "FeatureCollection",
        name: "draw",
        features: [],
      };
      drawPointsLayer.getSource().clear();
      json_point_feature = make_draw_points(json_point_feature, selected_point);
      console.log('値がある')
      console.log(json_point_feature)
      console.log(selected_point)
      draw_exe(drawPointsLayer, json_point_feature);
    }



    }

    return (
        <div>
            <div ref={mapElement} className="map-container"></div>
        </div>
    );
}

export default MapPage;