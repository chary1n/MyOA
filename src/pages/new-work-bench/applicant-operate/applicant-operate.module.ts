import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantOperatePage } from './applicant-operate';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    ApplicantOperatePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantOperatePage),AutoCompleteModule
  ],
})
export class ApplicantOperatePageModule {}
