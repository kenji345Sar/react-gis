import LineString from "ol/geom/LineString";
import Point from "ol/geom/Point";
import { transform as transformTo, fromLonLat } from "ol/proj";

export function getFeatureClickedMap(e,map) {
  //クリックするとfeatureがとれる仕様
  let featurePoint = map.forEachFeatureAtPixel(
    e.pixel,
    function (fearue, layer) {
      //ボーリング点上をクリックしたときの動作, f:選んだ点
      if (fearue != undefined) {
        return [fearue, layer];
      }
    }
  )
  //featureを取得できなければ以下処理しない
  if (typeof featurePoint === "undefined") {
    console.log("クリックした箇所でfeatureは取得できません");
    return;
  }
  let [feature, layer] = featurePoint;
  // let tmp;
  let point_arr; //クリックした点の制御用
  let info_arr; //情報表示用

  console.log(layer.get("title"));
  let tmp = feature.getProperties();

  //点であった場合を前提としている
  let coord = feature.getGeometry().getCoordinates()
  let idoKeidoZahyo = getzahyopoint(coord[0],coord[1])
  point_arr = {
    num: "",
    dx: idoKeidoZahyo[0],
    dy: idoKeidoZahyo[1],
  };
console.log(point_arr)
  
  console.log(point_arr)
  return [feature, layer, point_arr];
}

/**
 * ボーリングクリック時の対処
 *
 * @param {*} e
 * @return {*}
 */
 export function dataHandling(e, featurePoint, selected_point, deleted_point) {
  // let feature = clickMap(e);

  //featureを取得できなければ以下処理しない
  if (typeof featurePoint === "undefined") {
    return;
  }
console.log('いいいい')
  let [feature, layers, point_arr, info_arr] = featurePoint;
  let flagStatus = getButtonStatus(featurePoint);

console.log(flagStatus)
  let selectedPoint = [];
  let deletedPoint = [];
  switch (flagStatus) {
    case "add": //追加
      console.log("ボーリング点追加");
      // if (inputLineDistanceType != 2) {

      selectedPoint = addLastLoc(selected_point, point_arr);
      console.log(selectedPoint)
      // }
      break;
    case "selected": //選択済み
      console.log("選択済み点をクリック！");

      break;
    case "delselected": //削除済み点をクリック
      console.log("削除済み点をクリック！");
 
      break;
    case "custom":
      console.log("geojsonレイヤ");
    default:
      selectedPoint = selected_point;
      deletedPoint = deleted_point;
  }
  return [selectedPoint, deletedPoint];

}


/**
 * クリックした点の状態取得
 *
 * @param {*} feature
 * @return {*}
 */
 export function getButtonStatus(featurePoint) {
  //featureがなければ以下処理しない
  if (typeof featurePoint === "undefined") {
    return;
  }

  let [feature, layer,point_arr] = featurePoint;
console.log(layer)
console.log(layer.get("title"))
  //線をクリックした時


  let flagStatus;
  //新規、選択済み、削除済みを振り分ける
  if (layer.get("title") == "evacuation") {
    flagStatus = "add";

  } else {
    console.log("対象なし");
    // return;
  }
  return flagStatus;
}

/**
 * openlayers座標をボーリング点座標に変換
 *
 * @param {*} dx:Webメルカトル座標のx座標
 * @param {*} dy:Webメルカトル座標のy座標
 * @return {*} 緯度、経度の座標
 */
 export function getzahyopoint(dx, dy) {
  return transformTo([dx, dy], "EPSG:3857", "EPSG:4326");
}

export function addLastLoc(comd, _point_arr) {
  let json_selected_tmp = {
    num: comd.length + 1,
    // code: _point_arr.code,
    dx: _point_arr.dx,
    dy: _point_arr.dy,
  };
  console.log("うううう")
  console.log(json_selected_tmp)
  console.log(comd)
  // let flg = checkExistData(comd, _point_arr);
  // if (!flg) {
    comd.push(json_selected_tmp);
  // }
  return comd;
}