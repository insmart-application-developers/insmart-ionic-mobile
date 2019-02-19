import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { File } from '@ionic-native/file';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

interface MyListImage{
  url:string,
  checked:boolean
}

let myListImage:Array<MyListImage> = [
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false},
  {url:'assets/imgs/background-blue.jpg', checked:false}
];
@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-document-capture',
  templateUrl: 'home-insurance-submitclaim-document-capture.html',
})
export class HomeInsuranceSubmitclaimDocumentCapturePage {
  listImage:any=[];
  countSelected:number=0;
  tamListImage:any=[];
  loadingSpinner:Loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer,
    private sanitizer: DomSanitizer,
    private viewCtrl: ViewController,
    private camera: Camera,
    private file: File,
    private localStorge: StorageServiceProvider,
    private photoLibrary: PhotoLibrary,
    private loadingCtrl: LoadingController,
    ) {
      
  }

  ionViewDidLoad() {
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'Loading your library',
      dismissOnPageChange:true
    });
    this.loadingSpinner.present();
  }

  ngOnInit(){
    this.getUrlPhotoLibrary();
  }

  openCamera(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth:300,targetHeight:300
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.listImage.unshift({ url: base64Image, checked: false });
    }, (err) => {
      console.error(err);
    });
    
  }

  getUrlPhotoLibrary(){
    this.localStorge.getLocalStorage('photoLibrary').then((result)=>{
      console.log("Ket qua de: "+result);
      if(!result){
        this.photoLibrary.requestAuthorization().then(() => {
          this.photoLibrary.getLibrary().subscribe((library) => {
            library.forEach( libraryItem => {
              this.tamListImage.push({ url: libraryItem.thumbnailURL, checked: false });
              this.tamListImage.url = this.sanitizer.bypassSecurityTrustUrl('url(' + this.tamListImage.url + ')');
              this.loadingSpinner.dismiss();
            });
            this.localStorge.setLocalStorage('photoLibrary',this.tamListImage);
            this.initListImage(this.tamListImage,false);
          });
        }).catch((err) => {
          console.log('permissions weren\'t granted: ' +err );
          this.loadingSpinner.dismiss();
        });
      }
      else{
        this.tamListImage = result;
        this.initListImage(this.tamListImage,true);
        this.loadingSpinner.dismiss();
      }
    })
  }

  async initListImage(tamListImage,check:boolean){
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimDocumentCapturePage');
    if(check){
      this.listImage = tamListImage;
    }else{
      this.listImage=tamListImage.slice(0, 19);
    }
    this.countSelected = await this.listImage.filter((itemTrue)=>{
      return itemTrue.checked===true
    }).length;
    console.log("Độ dài của list Image: "+this.listImage.length);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    for (let i = 0; i < 19; i++) {
      let index = this.listImage.length;
      if(this.tamListImage[index+i]){
        this.listImage.push(this.tamListImage[index+i]);
      }else{
        infiniteScroll.enable(false);
      }
    }
    infiniteScroll.complete();
    console.log('Async operation has ended');
  }

  selectImage(check:boolean,index:number){
    if(check){
      this.listImage[index].checked = true;
      console.log(check + " ở vị trí "+this.listImage[index].checked);
    }
    else{
      this.listImage[index].checked = false;
      console.log(check + " ở vị trí "+this.listImage[index].checked);
    }
    this.countSelected = this.listImage.filter((itemTrue)=>{
      return itemTrue.checked===true
    }).length;
  }
  
  viewPhoto(url){
    console.log(this.file.applicationDirectory , url);
    let options = {
      share: true, // default is false
      closeButton: true, // default is true
      copyToReference: true // default is false
    };
    this.photoViewer.show(this.file.applicationDirectory+url,"Image Select",options);
  }

  btnSelect(){
    console.log(this.listImage);
    let result=this.listImage.filter((element) => {
      return element.checked === true;
    });;
    this.viewCtrl.dismiss(result);
  }
  ionViewWillLeave(){
    
  }
}
