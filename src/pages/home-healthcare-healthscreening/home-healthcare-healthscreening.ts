import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomeHealthcareHealthscreeningHealthchartPage } from '../home-healthcare-healthscreening-healthchart/home-healthcare-healthscreening-healthchart';
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

/**
 * Generated class for the HomeHealthcareHealthscreeningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-healthcare-healthscreening',
  templateUrl: 'home-healthcare-healthscreening.html',
})
export class HomeHealthcareHealthscreeningPage {
  healthscreenings:any[];
  shownGroup = null;
  userprofile:any;
  cardno:String;  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private mbrService: MemberServiceProvider,
    public storageService: StorageServiceProvider) {
    

      console.log("call HTH storage data"); 

      this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
          
        console.log("return storage data");
        this.userprofile = profiledata;
        console.log("get storage data : " + this.userprofile); 
        if(this.userprofile != null){
          console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
          this.cardno = this.userprofile.CardNo;
          console.log("card no from local storage : " + this.cardno);
 
          this.getHealthScreeningList(this.cardno);
         
          //console.log( "profile account detail : " + this.userprofile.EmailAdr + " " + this.userprofile.CardNo + " " + this.userprofile.UsrStat + " " + profileacct.ClientCode); 
  
          
        };
      })          
    
    // this.healthscreenings = [
    //   { title: '10.791385, 106.678185', id: 1,
    //   adress: '10 Trần Huy Liệu, Phú Nhuận, TP. Hồ Chí Minh', 
    //   name:'BỆNH VIỆN AN SINH - TP. Hồ Chí Minh' 
    //   },
    //   { title: '10.788921, 106.677838', id: 2, 
    //     adress: 'Số 94, Đường  Trần Quang Diệu, Phường 14, Quận 3, TP. Hồ Chí MinhCM.', 
    //     name:'NHA KHOA D.CASTA - TP. Hồ Chí Minh' 
    //   },
    //   { title: '10.732718, 106.718546', id: 3, 
    //     adress: '06 Nguyễn Lương Bằng, Phường tân Phong, Quận 7, TP. Hồ Chí Minh', 
    //     name:'BỆNH VIỆN PHÁP VIỆT - TP. Hồ Chí Minh' 
    //   }
    // ];

  }

  getHealthScreeningList(strCardno:String) {

    console.log("Start Call Member Health screening Service" + strCardno); 
  
    this.mbrService.GetMbrHthScnList(strCardno).subscribe( (data) => 
    { 
      console.log("subscribe return"); 
      
      console.log("get member health screening data : " + data);
  
      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        this.healthscreenings = obj;
      }
      else 
      {
             console.log("invalid account");
      };
    }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareHealthscreeningPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  btnChart(){
    this.navCtrl.push(HomeHealthcareHealthscreeningHealthchartPage);
  }
}
