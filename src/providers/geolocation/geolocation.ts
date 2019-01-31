import { Injectable } from '@angular/core';
import { Geolocation ,GeolocationOptions ,PositionError } from '@ionic-native/geolocation';

declare var google;
@Injectable()
export class GeolocationProvider {
  options : GeolocationOptions;
  public currentPos : any;
  geocoder = new google.maps.Geocoder;
  constructor(
    private geolocation : Geolocation
  ) {
    console.log('Hello GeolocationProvider Provider');
    this.initUserPosition();
  }

  initUserPosition(){
    this.options = {
      enableHighAccuracy : false
    };

    return new Promise(resolve => {
      this.geolocation.getCurrentPosition(this.options).then((pos) => {
        this.currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        resolve(this.currentPos);
      },(err : PositionError)=>{
        resolve(err);
      });
    })
  }

  watchPosition(){
    return this.geolocation.watchPosition();
  }

  geocodeLatLng(currentPos) {
    // let positionThaiNguyen = new google.maps.LatLng(21.534689, 105.794152);
    return new Promise( resolve => {
      this.geocoder.geocode({'location': currentPos},(results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            resolve('No results found');
          }
        } else {
          resolve('Geocoder failed due to: ' + status);
        }
      });
    })
  }

}
