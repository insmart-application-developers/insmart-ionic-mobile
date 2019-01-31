import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuInfoPage } from './menu-info';

@NgModule({
  declarations: [
    MenuInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuInfoPage),
  ],
})
export class MenuInfoPageModule {}
