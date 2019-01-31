import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the HomeInsuranceDirectbillingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-home-insurance-directbilling-detail',
  templateUrl: 'home-insurance-directbilling-detail.html',
})
export class HomeInsuranceDirectbillingDetailPage {
  @ViewChild('map') mapElement: ElementRef;
  itemHospital:any;
  currentPosition:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  map: any;
  marker:any;
  totalDist:any;
  totalTime:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform
  ) {
    this.itemHospital = this.navParams.get('itemHospital');
    this.totalDist = this.itemHospital.distance;
    this.totalTime = this.itemHospital.time;
    this.currentPosition = this.navParams.get('currentPosition');
    console.log(this.currentPosition);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceDirectbillingDetailPage');
    this.platform.ready().then(()=>{
      this.addMap();
    });
  }

  addMap(){
    
    let mapOptions = {
      center: this.itemHospital.position,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.addMarker();
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      position: this.currentPosition
    });
    
    let markerHospital = new google.maps.Marker({
      map: this.map,
      icon: 'assets/imgs/icon-findingmedicalproviders.png',
      position: this.itemHospital.position
    });
    
    google.maps.event.addListener(marker, 'click', () => {
      this.map.setCenter(this.currentPosition);
      this.map.setZoom(16);
    });

    google.maps.event.addListener(markerHospital, 'click', () => {
      this.map.setCenter(this.itemHospital.position);
      this.map.setZoom(16);
    });

    this.getDirectionDisplay(this.currentPosition,this.itemHospital.position);
  }

  getDirectionDisplay(origin,destination) {
    //Chỉ dẫn đường
    this.directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status)=> {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setOptions( { suppressMarkers: true } );
      } else {
        window.alert('Tên bệnh viện không được để trống');
      }
    });
  }
}
