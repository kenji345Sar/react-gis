
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
    style: styleFunction
});