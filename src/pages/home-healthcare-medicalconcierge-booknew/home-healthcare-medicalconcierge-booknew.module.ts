import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { HomeHealthcareMedicalconciergeBooknewPage } from './home-healthcare-medicalconcierge-booknew';

@NgModule({
  declarations: [
    HomeHealthcareMedicalconciergeBooknewPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeHealthcareMedicalconciergeBooknewPage),
    NgCalendarModule
  ],
})
export class HomeHealthcareMedicalconciergeBooknewPageModule {}
