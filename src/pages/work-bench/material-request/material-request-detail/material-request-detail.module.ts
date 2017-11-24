import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialRequestDetailPage } from './material-request-detail';

@NgModule({
  declarations: [
    MaterialRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialRequestDetailPage),
  ],
})
export class MaterialRequestDetailPageModule {}
