import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainContactListPage } from './main-contact-list';

@NgModule({
  declarations: [
    MainContactListPage,
  ],
  imports: [
    IonicPageModule.forChild(MainContactListPage),
  ],
})
export class MainContactListPageModule {}
