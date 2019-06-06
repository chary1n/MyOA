import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantCreateOfferPage } from './applicant-create-offer';

@NgModule({
  declarations: [
    ApplicantCreateOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantCreateOfferPage),
  ],
})
export class ApplicantCreateOfferPageModule {}
