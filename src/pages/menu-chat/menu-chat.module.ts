import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuChatPage } from './menu-chat';

@NgModule({
  declarations: [
    MenuChatPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuChatPage),
  ],
})
export class MenuChatPageModule {}
