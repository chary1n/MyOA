import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPersonPage } from './contact-person';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ContactPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPersonPage),AutoCompleteModule
  ],
  exports: [
    ContactPersonPage
  ]
})
export class ContactPersonPageModule {}
