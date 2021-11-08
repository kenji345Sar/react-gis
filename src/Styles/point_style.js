import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
// import { map } from "../index.js";

export default function (feature) {
  var geometry = feature.getGeometry();
  var shape = feature.get("shape");
  var styles = [];

  //zoomによるradius,size調整
  let radius, scale;
  // let zoom = map.getView().getZoom();
  // if (zoom > 15) {
  //   radius = 7;
  //   scale = 1;
  // } else if (zoom > 13 && zoom <= 15) {
  //   radius = 7;
  //   scale = 0.8;
  // } else if (zoom > 11 && zoom <= 13) {
  //   radius = 3;
  //   scale = 0.6;
  // } else {
  //   radius = 1.5;
  //   scale = 0;
  // }

  if (geometry.getType() == "Point") {
    styles = new Style({
      image: new CircleStyle({
        radius: 7,
        stroke: new Stroke({
          color: "rgb(0, 255, 0, 1)", //lime
        }),
        fill: new Fill({
          color: "rgba(0, 255, 0, 0.3)", //lime
        }),
      }),
      text: new Text({
        font: "15px roboto,sans-serif",
        text: feature.get("code"),
        fill: new Fill({
          color: "rgb(50, 205, 50, 1)", //limegreen
        }),
        textAlign: "center",
        textBaseline: "bottom",
        scale: 1,
        rotation: -0.785,
        offsetY: 0,
        offsetX: 35,
      }),
    });
  }
  return styles;
}
