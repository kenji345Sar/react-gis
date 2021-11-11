
import { fromLonLat } from 'ol/proj';

// GeoJSON読み込み
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';

import PointStyle from "../Styles/point_style";
import delStyle from "../Styles/del_style.js";
// import { GeoJSON } from "ol/format";

const data_format = new GeoJSON(); //地図データフォーマット

const GeodeticCoordinate = {
  dataProjection: "EPSG:4326",
  featureProjection: "EPSG:3857",
}; //地図読込フォーマット

// 外部GeoJSONスタイル設定
const styles = {
    'Point': new Style({
        image: new Circle({
            radius: 2.5,
            stroke: new Stroke({
                color: 'rgba(52, 152, 219, 1.0)',
                width: 1
            }),
            fill: new Fill({
                color: 'rgba(52, 152, 219, 0.4)'
            })
        })
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'rgba(241, 196, 15, 0.6)',
            width: 5
        })
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'rgba(255, 0, 0, 1.0)',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255, 0, 0, 0.4)'
        })
    })
};
const styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};


// 外部GeoJSONソース設定
const vectorSource = new VectorSource({
    url: 'data/sample.geojson',
    format: new GeoJSON()
});

// 外部GeoJSONレイヤ設定
export const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction,
    title:"evacuation",
    zIndex:20
});

export const draw_points_layer = new VectorLayer({
    source: new VectorSource(),
    style: PointStyle,
    title: "draw_points",
    className: "draw_points ol-layer",
    zIndex: 30,
    // minZoom: 14,
});

export const del_layer = new VectorLayer({
    source: new VectorSource(),
    style: delStyle,
    title: "delete_points",
    className: "delete_points ol-layer",
    zIndex: 30,
    // minZoom: 14,
});



export function make_draw_points(_jsonPointFeature, _jsonData) {
    if (_jsonData.length === 0) return;
    _jsonPointFeature.features = [];
    _jsonData.forEach(function (val, index) {
      //json_comdに距離を追加
      _jsonPointFeature.features.push({
        //json_point_feature(ハイライト）図形用JSON作成
        type: "Feature",
        id: index + 1,
        geometry: {
          type: "Point",
          coordinates: [val["dx"], val["dy"]],
        },
        properties: {
          num: val["num"],
          dx: val["dx"],
          dy: val["dy"],
          shape: "Point",
        },
      });
    });
    return _jsonPointFeature;
  }

  export function draw_feature(Layer, JSON_draw) {
    let features_draw = data_format.readFeatures(JSON_draw, GeodeticCoordinate);
    Layer.getSource().addFeatures(features_draw);
  }

  export function drawPoint(selected_point,deleted_point,drawPointsLayer,drawDeletsLayer){
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

    if (deleted_point.length > 0) {
      let json_delete_feature = {
        type: "FeatureCollection",
        name: "draw",
        features: [],
      };

      //削除点描画
      drawDeletsLayer.getSource().clear();
      json_delete_feature = make_draw_points(json_delete_feature, deleted_point);
      console.log('削除店')
      console.log(json_delete_feature)
      draw_exe(drawDeletsLayer, json_delete_feature);
    }

  }

  function draw_exe(Layer, JSON_draw) {
    let features_draw = data_format.readFeatures(JSON_draw, GeodeticCoordinate);
    Layer.getSource().addFeatures(features_draw);
  }