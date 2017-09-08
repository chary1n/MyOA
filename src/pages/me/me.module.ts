import { GroupsDirective } from './groups.directive';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';

@NgModule({
  declarations: [
    GroupsDirective,
    MePage,
  ],
  imports: [
    IonicPageModule.forChild(MePage),
  ],
  // entryComponents:[
  // MePage,EditInformationPage,PhoneNumberPage
  // ],
  // exports: [
  //   MePage
  // ]
})
export class MePageModule {}
