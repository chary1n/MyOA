import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantDetailPage } from './applicant-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ApplicantDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantDetailPage),IonicImageViewerModule
  ],
})
export class ApplicantDetailPageModule {}
