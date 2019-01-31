import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service'
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

@IonicPage()
@Component({
  selector: 'page-home-healthcare-medicalconcierge-booknew',
  templateUrl: 'home-healthcare-medicalconcierge-booknew.html',
  providers : [LocalJsonServiceProvider,GeolocationProvider]
})
export class HomeHealthcareMedicalconciergeBooknewPage {
  @ViewChild('searchSymptom') searchSymtom:Searchbar;
  @ViewChild('typeSymptom') typeSymptom;
  @ViewChild('rendererListSymptom') listSymptom:ElementRef;
  hospitalLists:any;
  hospitalList:any;
  hospitalName:any;
  cityFilters : any;
  selectAuto:any;
  symptoms:any;
  symptomList:any;
  currentCity:string;
  showListSymptom:boolean=false;
  showDifference:boolean=false;
  booknew = {
    searchSymptom:"",
    mdReasonSymptom:"",
    selectHosAuto:false,
    cityName:"",
    hospitalName:"",
    dateTime:"",
  };

  currentUser;
  eventSource;
  viewTitle;

  isToday:boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date()
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer2,
    private service : LocalJsonServiceProvider,
    private serviceCurrentPostion:GeolocationProvider
  ) {
    this.getAllList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalconciergeBooknewPage');
    setTimeout(() => {
      this.searchSymtom.setFocus();
    }, 1000);
    this.selectAuto={
      city: "Hà Nội",
      hosital:"Bệnh viện Việt Đức",
      address:" 40 Tràng Thi, Hàng Bông, Hoàn Kiếm, Hà Nội",
      distance:"7.3km"
    };
  }

  getAllList(){
    this.serviceCurrentPostion.initUserPosition().then(current =>
      this.serviceCurrentPostion.geocodeLatLng(current).then((currentCity)=>{
        let cityAddress = currentCity.toString().split(',');
        this.currentCity = cityAddress[cityAddress.length-2].trim();
      })
    );
    
    this.service.getFilterHospitalList().subscribe((res) => {
      this.cityFilters = res;
    });

    this.service.getHospitalList().subscribe((res) => {
      this.hospitalList = res;
      this.setBooking();
    });

    this.service.getSymptom().subscribe((res)=>{
      this.symptomList =Object.assign(res,{"selected":false});
      this.symptoms = this.symptomList;
    });
  }
  
  onInput(ev: any) {
    this.symptoms = this.symptomList;
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.symptoms = this.symptoms.filter((item)=>{
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
      this.showListSymptom = true;
    }
  }

  onClear(){
    this.booknew.searchSymptom="";
    this.showListSymptom = false;
  }

  showSymptom(status:number){
    
    if(status == 0){
      setTimeout(() => {
        this.showListSymptom = false;
        this.symptoms = this.symptomList;
      }, 10);
    }else if(status == 1){
      this.showListSymptom = true;
    }
    
  }

  showDifferenceItem(){
    this.booknew.searchSymptom = "Khác..."
    this.showDifference = true;
    this.booknew.selectHosAuto = false;
    setTimeout(() => {
      this.typeSymptom.setFocus();
    }, 150);
  }
  changeSelectHosAuto(){
    console.log("Trạng thái: "+this.booknew.selectHosAuto);
    console.log("Thời gian: "+this.booknew.dateTime.length);
  }
  frmConcierge(){
    this.navCtrl.parent.select(0);
    console.log(this.booknew);
  }
  async setBooking(){
    let id = this.navParams.data;
    let hospitalList = await this.hospitalList;
    let cityName = await this.cityFilters;
    if(id.booknew){
      hospitalList = hospitalList.filter((hos) =>{
        if(hos.id === id.booknew){
          cityName = cityName.filter((city) => {
            if(city.id === hos.idcity){
              this.booknew.cityName = city.id;
              this.cityChange();
              this.hospitalName = id.booknew;
              console.log("id :",this.booknew.cityName+" và "+this.hospitalName);
            }
          });
        };
      });
    }
  }

  btnSelectSymptom(symptom){
    console.log("Current ID Symptom: "+ symptom.id);
    this.booknew.searchSymptom = symptom.name;
    this.showDifference = false;
  }

  cityChange() {
    this.hospitalLists = this.hospitalList.filter(hos => hos.idcity===this.booknew.cityName);
  }
  hosChange(hos){
    console.log('Change: '+hos);
  }
}
