import { GroupsDirective } from './groups.directive';
import { PhoneNumberPage } from './phone-number/phone-number';
import { EditInformationPage } from './edit-information/edit-information';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';

@NgModule({
  declarations: [
    GroupsDirective,
    MePage,EditInformationPage,PhoneNumberPage
  ],
  imports: [
    IonicPageModule.forChild(MePage),
  ],
  entryComponents:[
  MePage,EditInformationPage,PhoneNumberPage
  ],
  exports: [
    MePage
  ]
})
export class MePageModule {}
