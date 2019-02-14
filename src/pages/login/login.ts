import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[StorageServiceProvider,AuthService]
})
export class LoginPage {
  @ViewChild('password') inputPassword;
  formGroup : FormGroup;
  loading: Loading;
  loginData = { username:"", password:"" };
  showPassword:boolean = false;
  oUsrMemberInfo;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl:ToastController,
    private auth: AuthService,
    private storageService: StorageServiceProvider,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder

  ) {

    // this.storageService.getStorage('account').then((data) => {
    //   this.loginData.username = data.username;
    //   this.loginData.password = data.password;
    // }, error => console.error("Lỗi "+error));
    // this.validation();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validation(){
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
    });
  }

  doLogin(){
    
    console.log("user name : " + this.loginData.username);

    if(this.loginData.username === "" || this.loginData.password === ""){
      this.showToast('User name and Password must not be empty',1500,'bottom').present();
    }else{

      console.log("start auth call!!!");
      this.showLoading();
      this.auth.login(this.loginData).subscribe( (data) =>{ 
        //console.log(data); 
        console.log("subscribe return"); 
        
        if( data && data !== "null" && data !== "undefined" ) {
          this.storageService.getLocalStorage("profileacct").then( async(profileacct) => {
            
            console.log("get storage data : " + profileacct); 
            if(profileacct != null){
              // console.log("profile account : " + profileacct);
              // console.log( "profile account detail : " + profileacct.EmailAdr + " " + profileacct.CardNo + " " + profileacct.UsrStat + " " + profileacct.ClientCode); 

              this.oUsrMemberInfo = profileacct.UsrMemberInfo;
              // console.log("card member : " + this.oUsrMemberInfo);
              // console.log("card member detail : " + this.oUsrMemberInfo.CardNo + " " + this.oUsrMemberInfo.PlanCode + " " + this.oUsrMemberInfo.ContractNo); 
              // console.log("card member detail : " + this.oUsrMemberInfo.CardNo + " " + this.oUsrMemberInfo.PlanCode + " " + this.oUsrMemberInfo.CurrentID1 + " " + this.oUsrMemberInfo.OrgCode);

              this.loading.dismiss();
              this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
            }
            else {
              var obj = JSON.parse(data);
              await this.storageService.setLocalStorage("profileacct", obj);
              this.loading.dismiss();
              setTimeout(() => {
                this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
              }, 200);
              console.log("get storage data : " + obj);
            }
          })
        }
        else{
          this.loginData.username = "";
          this.loginData.password = "";
          this.showToast('Invalid user login and password!',3000,'bottom').present();
          this.loading.dismiss();
        };
      });  

    console.log("end testing");

    }
    
  }

  checkDisabled(){
    if(this.loginData.username.length <=3 || this.loginData.password.length <=3){
      return true;
    }
    else{
      return false;
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    return this.loading.present();
  }
 
  showError(text) {
    this.showToast(text,3000,'bottom').present();
    // this.loading.dismiss();
  }

  showToast(message,duration,position){
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
  }

  btnShowPassword(){
    console.log("Bat dau chay");
    this.showPassword = true;
  }
  
  btnHidePassword(){
    console.log("Ket thuc chay");
    this.showPassword = false;
  }
}
