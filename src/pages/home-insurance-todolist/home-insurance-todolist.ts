import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service'


/**
 * Generated class for the HomeInsuranceTodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-todolist',
  templateUrl: 'home-insurance-todolist.html',
})
export class HomeInsuranceTodolistPage {
  todolist:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: LocalJsonServiceProvider) {
    this.service.getTodoList().subscribe((res) => {
      this.todolist = res;
      console.log(this.todolist);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceTodolistPage');
  }
}
