import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content ,Platform, LoadingController, Loading, InfiniteScroll, AlertController } from 'ionic-angular';
import { GeolocationOptions } from '@ionic-native/geolocation'; 

import { HomeInsuranceDirectbillingDetailPage } from '../home-insurance-directbilling-detail/home-insurance-directbilling-detail';

import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the HomeInsuranceDirectbillingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-home-insurance-directbilling',
  templateUrl: 'home-insurance-directbilling.html',
  providers:[GeolocationProvider,LocalJsonServiceProvider]
})
export class HomeInsuranceDirectbillingPage {
  @ViewChild(Content) content: Content;
  options : GeolocationOptions;
  city:any;
  currentPos : any;
  getHospitals:any;
  hospitalLists:any;
  hospitalFilterLists:any;
  poa:any;
  filterHospitals : any;
  geocoder = new google.maps.Geocoder;
  showButton = false;
  private loadingSpinner:Loading;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private alertCtrl: AlertController, 
    private service:LocalJsonServiceProvider,
    private loadingCtrl: LoadingController,
    private serviceCurrentPostion:GeolocationProvider
    ) {

    this.serviceCurrentPostion.initUserPosition().then((pos) => {
      this.currentPos = pos;
      this.geocodeLatLng(this.geocoder,this.currentPos);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceDirectbillingPage');
    this.platform.ready().then(() => {
      this.loadingSpinner = this.loadingCtrl.create({
        content: 'Finding your city',
        duration:15000,
        dismissOnPageChange:true
      });
      this.loadingSpinner.present();
      
    });
    // this.showButtonScrollTop();
  }

  geocodeLatLng(geocoder,currentPos) {
    // let positionThaiNguyen = new google.maps.LatLng(21.534689, 105.794152);

    geocoder.geocode({'location': currentPos}, async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let cityAddress = await (results[0].formatted_address).split(',');
          this.city = cityAddress[cityAddress.length-2].trim();
          console.log(this.city);
          this.cityChange(this.city);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });

  }
  changeCity(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter Status Claim');
    for(let i=0;i<this.filterHospitals.length;i++){
      alert.addInput({
        type: 'radio',
        label: this.filterHospitals[i].city,
        value: this.filterHospitals[i].city,
        checked: false
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (thgqbt: Observable<string>) => {
        this.cityChange(thgqbt);
        this.city = thgqbt;
        this.loadingSpinner = this.loadingCtrl.create({
          content: 'Changing your city',
          duration:15000,
          dismissOnPageChange:true
        });
        this.loadingSpinner.present();
      }
    });

    alert.present();
  }
  //Event when click item list
  getItem(itemHospital){
    this.navCtrl.push(HomeInsuranceDirectbillingDetailPage,
      {'itemHospital':itemHospital, 'currentPosition':this.currentPos}
    );
  }

  //Filter and Merge hospital list with list 25 distance
  cityChange(city:Observable<string>) {
    this.service.getHospitalList().subscribe(res => {
      this.getHospitals = res;

      this.service.getFilterHospitalList().subscribe(res => {

        this.filterHospitals = res;
        new Promise((resolve, reject)=>{
          let idString = this.filterHospitals.filter(filter=>{
            if(filter){
              return filter.city === city;
            }
          });
          resolve(idString);
        }).then(results=>{
          this.hospitalFilterLists = this.getHospitals.filter(hos =>{
            return hos.idcity === results[0].id;
          });
          return this.hospitalFilterLists;
        }).then(results=>{
          this.poa = results.map(posi =>{
            return posi.position;
          });
          return this.poa;
        }).then(results=>{
          let hospitalLists = [];
          this.getMatrixDistance(this.currentPos,results.slice(0,23)).subscribe(listdistance =>{
            console.log(results.slice(0,23));
            console.log(listdistance);
            
            for(let i=0; i < 24; i++){
              console.log(i);
              
              if(this.hospitalFilterLists[i]){
                hospitalLists.push(Object.assign(this.hospitalFilterLists[i], listdistance[i]));
              }
            }
            this.hospitalLists = hospitalLists;
          });
        }).then(()=>{
          this.hospitalLists.sort((obj1, obj2)=>{
            // Ascending: first age less than the previous
            return parseInt(obj1.distance) - parseInt(obj2.distance)
          });
          this.loadingSpinner.dismiss();
        });
      });
    });
  }

  //Pull down for Loading more data
  doInfinite(infiniteScroll: InfiniteScroll){
    console.log('Begin async operation');
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'Load more Facilities Medical',
      duration:15000,
      dismissOnPageChange:true
    });
    this.loadingSpinner.present();
    let start = this.hospitalLists.length;
    this.getMatrixDistance(this.currentPos,this.poa.slice(start,start+24)).subscribe(listdistance =>{
 
      for(let i=start ; i < start+25; i++){
        if(this.hospitalFilterLists[i]){
          this.hospitalLists.push(Object.assign(this.hospitalFilterLists[i],listdistance[i-start]));
        }
      }
      this.hospitalLists.sort((obj1, obj2)=>{
        // Ascending: first age less than the previous
        return parseInt(obj1.distance) - parseInt(obj2.distance)
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
      this.loadingSpinner.dismiss();
      if (this.hospitalLists.length === this.hospitalFilterLists.length) {
        infiniteScroll.enable(false);
      }
    });
    
  }

  //Function get Matrix Distance and return list distance
  getMatrixDistance(origin,poa){
    let service = new google.maps.DistanceMatrixService;
    let observable = new Observable(observer =>{
      service.getDistanceMatrix({
        origins: [origin],
        destinations: poa,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          let originList = response.originAddresses;
          // let destinationList = response.destinationAddresses;
          let totalCal = [];
          for (let i = 0; i < originList.length; i++) {
            let results = response.rows[i].elements;
            console.log(results);
            
            for (let j = 0; j < results.length; j++) {
              totalCal[i] = { distance:results[j].distance.text, time:results[j].duration.text };
              totalCal.push(totalCal[i]);
            }
          }
          observer.next(totalCal);
          observer.complete();
        }
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.loadingSpinner.dismissAll();
    // this.service.getHospitalList().subscribe().unsubscribe();
    // this.service.getFilterHospitalList().subscribe().unsubscribe();
  }
}