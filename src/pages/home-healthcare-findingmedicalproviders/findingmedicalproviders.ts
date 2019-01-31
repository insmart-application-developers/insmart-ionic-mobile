import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController,Platform,LoadingController, Loading } from 'ionic-angular';

import { HomeHealthcareMedicalconciergePage } from '../home-healthcare-medicalconcierge/home-healthcare-medicalconcierge';

import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

/**
 * Generated class for the FindingmedicalprovidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-findingmedicalproviders',
  templateUrl: 'findingmedicalproviders.html',
  providers:[GeolocationProvider, LocalJsonServiceProvider]
})

export class FindingmedicalprovidersPage {
  currentPos : any;
  hospitallists:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  infoWindow = new google.maps.InfoWindow;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any;
  loadingSpinner:Loading;
  geocoder = new google.maps.Geocoder;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private service:LocalJsonServiceProvider,
    private serviceCurrentPostion:GeolocationProvider,
    private loadingCtrl: LoadingController
  ) {
    this.service.getHospitalList().subscribe((res) => {
      console.log('get hospital list is done !');
      this.hospitallists = res;
      console.log(this.hospitallists);
    });

    this.serviceCurrentPostion.initUserPosition().then((pos) => {
      this.currentPos = pos;
      console.log(this.currentPos);
      this.addMap(this.currentPos);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindingmedicalprovidersPage');
    this.platform.ready().then(() => {
      this.loadingSpinner = this.loadingCtrl.create({
        content: 'Finding health facilities near your location'
      });
      this.loadingSpinner.present();
    });
  }

  addMap(currentPos){
    let mapOptions = {
      center: currentPos,
      zoom: 13,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('btnGetCurrent'));
    //event Button find me.
    document.getElementById('btnGetCurrent').addEventListener('click',()=>{
      this.map.setCenter(this.currentPos);
      this.map.setZoom(16);
    });
    this.directionsDisplay.setMap(this.map);
    
    let currentMarker = new google.maps.Marker({
      map: this.map,
      position: currentPos
    });
    
    google.maps.event.addListener(currentMarker, 'click', () => {
      this.serviceCurrentPostion.geocodeLatLng(currentPos).then( city =>{
        let content = 
              '<div><strong>'+'Your current address: ' +'</strong></br>'+'<p class>'+city+'</p>';

              this.infoWindow.setContent(content);
              this.infoWindow.setOptions({maxWidth:200});
              this.infoWindow.open(this.map, currentMarker);
      });
    });
    setTimeout(() => {
      this.addMarker();
    }, 1000);
    
  }

  async addMarker(){
    if(this.hospitallists != null || this.hospitallists != undefined){
      this.loadingSpinner.dismiss();
      for(let i=0;i< this.hospitallists.length;i++){
        let lat1 = this.hospitallists[i].position.lat;
        let lng1 = this.hospitallists[i].position.lng;
        let nameHospital = this.hospitallists[i].name;
        let addHospital = this.hospitallists[i].address;
        let idHospital = this.hospitallists[i].id;
        

        let userPosition={
          lat:this.currentPos.lat(),
          lng:this.currentPos.lng(),
        };

        let placeLocation={
          lat:lat1,
          lng:lng1,
        };

        let listDistance = this.getDistanceBetweenPoints(
          userPosition,
          placeLocation
        );

        if(listDistance < 5){
          let marker = await new google.maps.Marker({
            map: this.map,
            icon: 'assets/imgs/icon-findingmedicalproviders.png',
            position: placeLocation
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.getDirectionDisplay(this.currentPos,placeLocation).then(async(data) => {

              let content = 
              '<div><strong>'+nameHospital +'</strong></br>'+addHospital +'</br>'+
              'Thời gian dự kiến : '+data[1]+' minutes'+'</br>'+
              'Khoảng cách : '+data[0]+' meters'+'</br>'+'</br>'+
              '<button id="btnBooking">Booking</button></div>';

              this.infoWindow.setContent(content);
              this.infoWindow.setOptions({maxWidth:200});
              await this.infoWindow.open(this.map, marker);
              
              google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
                console.log("event closing the infowindow");
                this.directionsDisplay.set('directions', null);
              });

              document.getElementById("btnBooking").addEventListener('click', () => {
                this.navCtrl.push(HomeHealthcareMedicalconciergePage,
                  {'id':idHospital}
                );
              });
              
            });

          });
        }
      }
    }
  }

  getDirectionDisplay(origin,destination) {
    return new Promise(resolve =>{
      //Chỉ dẫn đường
      this.directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status)=> {
        if (status === google.maps.DirectionsStatus.OK) {
          let myroute = response.routes[0];
          for (let i = 0; i < myroute.legs.length; i++) {
            
            let totalDist = myroute.legs[i].distance.value;
            let totalTime = (myroute.legs[i].duration.value/60).toFixed(0);
            resolve([totalDist,totalTime]);
          }
          this.directionsDisplay.setDirections(response);
          this.directionsDisplay.setOptions( { suppressMarkers: true } );
        } else {
          window.alert('Không lấy được tọa độ bệnh viện '+status);
        }
      });
    })
    
  }

  getDistanceBetweenPoints(start,end){

    let R = 6371;
    let lat1 = start.lat;
    let lng1 = start.lng;
    let lat2 = end.lat;
    let lng2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLng = this.toRad((lng2 - lng1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  toRad(x){
    return x * Math.PI / 180;
  }

  ionViewWillLeave() {
    this.loadingSpinner.dismissAll();
  }
}
