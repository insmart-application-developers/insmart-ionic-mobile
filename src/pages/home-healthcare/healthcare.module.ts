import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthcarePage } from './healthcare';

@NgModule({
  declarations: [
    HealthcarePage,
  ],
  imports: [
    IonicPageModule.forChild(HealthcarePage),
  ],
})
export class HealthcarePageModule {}
