import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialRequestPage } from './material-request';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    MaterialRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialRequestPage),AutoCompleteModule,
  ],
})
export class MaterialRequestPageModule {}
