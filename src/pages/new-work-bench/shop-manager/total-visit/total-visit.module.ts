import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalVisitPage } from './total-visit';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    TotalVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(TotalVisitPage),AutoCompleteModule
  ],
})
export class TotalVisitPageModule {}
