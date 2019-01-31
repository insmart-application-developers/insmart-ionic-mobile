import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeInsuranceTodolistPage } from './home-insurance-todolist';

@NgModule({
  declarations: [
    HomeInsuranceTodolistPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeInsuranceTodolistPage),
  ],
})
export class HomeInsuranceTodolistPageModule {}
