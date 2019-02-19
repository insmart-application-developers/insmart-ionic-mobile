import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';


/**
 * Generated class for the HomeInsuranceClaimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-claim',
  templateUrl: 'home-insurance-claim.html',
})
export class HomeInsuranceClaimPage {
  selected:string='0';
  shownGroup = null;
  getClaims:any;
  claims:any;
  userprofile:any;
  cardno:String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private mbrService: MemberServiceProvider,
    public storageService: StorageServiceProvider) {

      console.log("call storage data"); 

      this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
          
        console.log("return storage data");
        this.userprofile = profiledata;
        console.log("get storage data : " + this.userprofile); 
        if(this.userprofile != null){
          console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
          this.cardno = this.userprofile.CardNo;
          console.log("card no from local storage : " + this.cardno);
 
          this.CallMbrClaim(this.cardno);
         
          //console.log( "profile account detail : " + this.userprofile.EmailAdr + " " + this.userprofile.CardNo + " " + this.userprofile.UsrStat + " " + profileacct.ClientCode); 
        };
      })
 

    //   this.service.getClaimList().subscribe(res => {
    //   this.getClaims = res;
    //   this.getData();
    // })


  }

  CallMbrClaim(strCardno:String) {

    console.log("Start Call Member Service" + strCardno); 
  
    this.mbrService.GetMbrClaim(strCardno).subscribe( (data) => 
    { 
      //console.log(data); 
      console.log("subscribe return"); 
      
      console.log("get claim data : " + data);
  
      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        //console.log(obj.EmailAdr + " " + obj.CardNo + " " + obj.UsrStat + " " + obj.ClientCode); 
        this.getClaims = obj;
        this.getData();
  
                 
      }
      else 
      {
             console.log("invalid account");
      };
    }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceClaimPage');
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
  
  getData(){
    this.claims = this.getClaims;
  }
  btnFilter(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter Status Claim');

    alert.addInput({
      type: 'radio',
      label: 'All',
      value: '0',
      checked: this.selected==='0'
    });

    alert.addInput({
      type: 'radio',
      label: 'Solve',
      value: '1',
      checked: this.selected==='1'
    });

    alert.addInput({
      type: 'radio',
      label: 'Pending',
      value: '2',
      checked: this.selected==='2'
    });

    alert.addInput({
      type: 'radio',
      label: 'Refuse',
      value: '3',
      checked: this.selected==='3'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (thgqbt: any) => {
        if(thgqbt==='0'){
          this.getData();
        }
        else{
          this.claims = this.getClaims.filter((claim) => {
            return claim.thgqbt === thgqbt;
          });
        console.log('Radio data:', this.claims);
        }
        this.selected = thgqbt;
      }
    });

    alert.present();
  }
}
