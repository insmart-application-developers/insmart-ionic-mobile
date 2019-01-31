import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the MenuUserinformationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-userinformation-modal',
  templateUrl: 'menu-userinformation-modal.html',
})
export class MenuUserinformationModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl : ViewController,
    private camera: Camera,
    private crop: Crop
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuUserinformationModalPage');
  }
  
  btnChooseLibrary(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit:true,targetWidth:300,targetHeight:300
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let userAvatar = 'file://' + imageData;
      console.log(userAvatar);
      if(userAvatar){
        this.crop.crop( userAvatar, { quality: 100,targetHeight:300,targetWidth:300 }).then((newImage) =>{
          console.log("OK");
          this.viewCtrl.dismiss(newImage);
        },(error) => {
          console.error('Error cropping image', error);
          this.viewCtrl.dismiss();
        });
      }
    }, (err) => {
     // Handle error
    });
  }

  btnTakePhoto(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit:true,targetWidth:300,targetHeight:300
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let userAvatar = 'data:image/jpeg;base64,' + imageData;
     this.viewCtrl.dismiss(userAvatar);
    }, (err) => {
     // Handle error
    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
}
