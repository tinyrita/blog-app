import {Page} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';


@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  static get parameters() {
    return [[ConferenceData]];
  }

  constructor(confData) {
    this.confData = confData;
  }

  onPageLoaded() {
    this.confData.getMap().then(mapData => {
      let mapEle = document.getElementById('map');

      let cdata = mapData.find(d => d.center);
      let map = new AMap.Map(mapEle, {
	center: [cdata.lng,cdata.lat],
        zoom: 16
      });

      mapData.forEach(markerData => {
	      let infoWindow = new AMap.InfoWindow({
		      content: `<h1>标记位置:</h1><p>${markerData.name}。</p>`,
		      offset: new AMap.Pixel(0, -30),
		      size:new AMap.Size(230,0)
	      });

	      let marker = new AMap.Marker({
		      position: [markerData.lng,markerData.lat],
		      map: map,
		      title: markerData.name
	      });

	      let clickHandle = AMap.event.addListener(marker,'click', () => {
		      infoWindow.open(map, marker.getPosition());
	      });
      });

      AMap.event.addListenerOnce(map, 'idle', () => {
	      mapEle.classList.add('show-map');
      });
    });
  }
}
