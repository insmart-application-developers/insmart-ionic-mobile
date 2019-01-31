import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

/**
 * Generated class for the HomeInsuranceBenefitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-benefit',
  templateUrl: 'home-insurance-benefit.html',
  providers:[LocalJsonServiceProvider, MemberServiceProvider]
})
export class HomeInsuranceBenefitPage {

  mainBentbls:any;
  headerstables:any;
  // headerstables:any=[
  //   'Bảo hiểm/Giới hạn',
  //   'Bồi thường lũy kế',
  //   'Hạn mức bảo hiểm còn lại'];
  mdChangeColumn:any=0;
  inpatients:any[];
  userprofile:any;
    shownGroup = null;
    mcardno:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: LocalJsonServiceProvider,
    private memberservice: MemberServiceProvider,
    public storageService: StorageServiceProvider) {
    
      //let cardno = 'INSMART00000900'; 

      console.log("call storage data"); 

      this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
          
        console.log("return storage data");
        this.userprofile = profiledata;
        console.log("get storage data : " + this.userprofile); 
        if(this.userprofile != null){
          console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
          this.mcardno = this.userprofile.CardNo;
          console.log("card no from local storage : " + this.mcardno);
 

          this.GetMemberFilterOpt(this.mcardno);


          this.GetMemberBenfUtil(this.mcardno);
         
          //console.log( "profile account detail : " + this.userprofile.EmailAdr + " " + this.userprofile.CardNo + " " + this.userprofile.UsrStat + " " + profileacct.ClientCode); 
  
          
        };
      })      



    




    // this.memberservice.GetMbrBenefitTypes(cardno).subscribe( (data) => 
    // { 
    //   //console.log(data); 
    //   console.log("subscribe member benefit types return"); 
      
    //   console.log("get member benefit types : " + data);

    //   if( data && data !== "null" && data !== "undefined" ) {
    //     var obj = JSON.parse(data);
    //     this.mainBentbls = obj;

                           
    //   }
    //   else 
    //   {
    //          console.log("invalid member benefit display option");
    //   };
    // }); 




    // this.service.getBenefitList().subscribe((res) => {
    //   this.inpatients = res;
    // });


  }

  GetMemberFilterOpt(sCardno:String) {

    console.log("Start Call Member Benefit  Service " + sCardno); 


    this.memberservice.GetMbrBenefitFilterOpt(sCardno).subscribe( (data) => 
    { 
      //console.log(data); 
      console.log("subscribe member benefit display option return"); 
      
      console.log("get member benefit display option : " + data);

      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        this.headerstables = obj;
        this.mdChangeColumn  = "MOAMBDISOPTBC";
                           
      }
      else 
      {
             console.log("invalid member benefit display option");
      };
    }); 

  }

  GetMemberBenfUtil(sCardno:String) {

    this.memberservice.GetMbrBenefitUtil(sCardno).subscribe( (data) => 
    { 
      //console.log(data); 
      console.log("subscribe member benefit list return"); 
      
      console.log("get member benefit data : " + data);

      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);

        console.log( "testing array - MainBenefitList : " + obj['MainBenefitList']);

        this.inpatients = obj['MainBenefitList'];
        

        //filterargs = {BenefitCode: 'HSSC'}; 
                           
      }
      else 
      {
             console.log("invalid member benefit list");
      };
    }); 


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceBenefitPage');
  }

  toggleGroup(group) {
    group.show = !group.show;
  };

  isGroupShown(group) {
    return group.show;
  };
}
