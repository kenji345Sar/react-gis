import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  } from 'ol/style';

export default function(feature) {
  var geometry = feature.getGeometry();
  var shape = feature.get('shape');
  var styles = [];
  if (geometry.getType() == 'Point') {
      styles.push(
          new Style({
              image   : new CircleStyle({
                  radius  : 7,
                  stroke  : new Stroke({
                      color   : 'rgb(255, 0, 255, 1)',
                  }),
                  fill    : new Fill({
                      color   : 'rgba(228, 0, 127, 0.3)',
                  })
              }),
              text    : new Text({
                  font    : '15px roboto,sans-serif',
                  text    : feature.get('code'),
                  fill    : new Fill({
                    color     : 'rgb(255, 0, 255, 1)'
                  }),
                  textAlign   : 'center',
                  textBaseline: 'bottom',
                  size        : 17,
                  rotation    : -0.785,
                  offsetY     : 0,
                  offsetX     : 35
                }),
          })
      );
  }else if (shape == 'LineString'){
      styles.push(
          new Style({
              stroke  : new Stroke({
                  color   : 'rgb(255, 0, 0, 1)',
                  width   : 2
              })
          })
      );
  }else {
      styles.push(
          new Style({
              stroke  : new Stroke({
                  color   : 'rgb(255, 0, 0, 1)',
                  width   : 2
              }),
              fill    : new Fill({
                  color   : 'rgba(255, 0, 0, 0.3)',
              })
          })
      );
  }
  return styles;
};