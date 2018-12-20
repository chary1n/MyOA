import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OldContactPersonPage } from './old-contact-person';

@NgModule({
  declarations: [
    OldContactPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(OldContactPersonPage),
  ],
})
export class OldContactPersonPageModule {}
