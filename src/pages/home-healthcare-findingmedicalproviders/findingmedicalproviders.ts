import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController,Platform,LoadingController, Loading, MenuController } from 'ionic-angular';

import { HomeHealthcareMedicalconciergePage } from '../home-healthcare-medicalconcierge/home-healthcare-medicalconcierge';
import { TranslateService } from '@ngx-translate/core';
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
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentPos : any;
  hospitallists:any;
  newHospitallists:any=[];
  markers:any=[];
  loadingSpinner:Loading;
  
  infoWindow = new google.maps.InfoWindow;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  geocoder = new google.maps.Geocoder;
  draggable:boolean=true;
  infoWindowTrans={
    name:"",
    address:"",
    duration:"",
    distance:"",
    booking:""
  }
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private service:LocalJsonServiceProvider,
    private serviceCurrentPostion:GeolocationProvider,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController
  ) {
    this.service.getHospitalList().subscribe((res) => {
      this.hospitallists = res;
    });

    this.serviceCurrentPostion.initUserPosition().then((pos) => {
      this.currentPos = pos;
      this.addMap(this.currentPos);
    });
    this.translateLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindingmedicalprovidersPage');
    this.platform.ready().then(() => {
      this.loadingSpinner = this.loadingCtrl.create({
        content: 'Finding health facilities near your location',
        dismissOnPageChange:true
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
      fullscreenControl: false,
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
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('btnListHos'));
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('btnGetCurrent'));
    
    //event Button find me.
    document.getElementById('btnGetCurrent').addEventListener('click',()=>{
      this.map.setCenter(this.currentPos);
      this.map.setZoom(15);
    });

    document.getElementById('btnListHos').addEventListener('click',()=>{
      this.draggable = false;
      this.menuCtrl.open('right');
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

        let listDistance = parseFloat(this.getDistanceBetweenPoints(
          userPosition,
          placeLocation
        ));

        if(listDistance < 5){
          this.newHospitallists.push(Object.assign(this.hospitallists[i],{distance:listDistance}));
          this.newHospitallists.sort((obj1, obj2)=>{
            // Ascending: first age less than the previous
            return obj1.distance - obj2.distance
          });
          
          let marker = await new google.maps.Marker({
            map: this.map,
            icon: 'assets/imgs/icon-findingmedicalproviders.png',
            position: placeLocation,
            id:idHospital
          });
          this.markers.push(marker);
          
          google.maps.event.addListener(marker, 'click', () => {
            this.markers.filter((element)=>{
              element.setMap(null);
              google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
                this.directionsDisplay.set('directions', null);
                element.setMap(this.map);
              });
            });
            this.getDirectionDisplay(this.currentPos, placeLocation).then(async(data) => {
              marker.setMap(this.map);
              let content = 
              '<div><strong>'+nameHospital +'</strong><p>'+addHospital +'</p>'+
              this.infoWindowTrans.duration+': '+data[1]+' minutes'+'</br>'+
              this.infoWindowTrans.duration+': '+data[0]+' meters'+'</br>'+'</br>'+
              '<button id="btnBooking">'+this.infoWindowTrans.booking+'</button></div>';

              this.infoWindow.setContent(content);
              this.infoWindow.setOptions({maxWidth:200});
              await this.infoWindow.open(this.map, marker);

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

  eventClickMarker(hospitalList){
    this.menuCtrl.toggle('right');
    this.markers.forEach(element => {
      if(element.id == hospitalList.id){
        google.maps.event.trigger(element, 'click');
      }
    });
    
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
    return d.toFixed(2);
  }

  toRad(x){
    return x * Math.PI / 180;
  }

  touchContent(){
    this.menuCtrl.close('right').then(()=>this.draggable = true);
  }

  translateLang(){
    this.translate.get(
      ['HOME_HEALTHCARE.FINDINGMEDICALPROVIDERS.INFOWINDOW.NAME',
      'HOME_HEALTHCARE.FINDINGMEDICALPROVIDERS.INFOWINDOW.ADDRESS',
      'HOME_HEALTHCARE.FINDINGMEDICALPROVIDERS.INFOWINDOW.DURATION',
      'HOME_HEALTHCARE.FINDINGMEDICALPROVIDERS.INFOWINDOW.DISTANCE',
      'HOME_HEALTHCARE.FINDINGMEDICALPROVIDERS.INFOWINDOW.BOOKING'
      ]
      ).subscribe(
      value => {
        // value is our translated string
        let alertTitle = value;
        this.infoWindowTrans={
          name:alertTitle[Object.keys(alertTitle)[0]],
          address:alertTitle[Object.keys(alertTitle)[1]],
          duration:alertTitle[Object.keys(alertTitle)[2]],
          distance:alertTitle[Object.keys(alertTitle)[3]],
          booking:alertTitle[Object.keys(alertTitle)[4]],
        }
        console.log(this.infoWindowTrans);
      }
    )
  }

  ionViewWillLeave() {
    this.menuCtrl.close('right');
    this.loadingSpinner.dismissAll();
  }
}
