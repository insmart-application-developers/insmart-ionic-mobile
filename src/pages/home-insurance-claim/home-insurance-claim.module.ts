import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeInsuranceClaimPage } from './home-insurance-claim';

@NgModule({
  declarations: [
    HomeInsuranceClaimPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeInsuranceClaimPage),
  ],
})
export class HomeInsuranceClaimPageModule {}
