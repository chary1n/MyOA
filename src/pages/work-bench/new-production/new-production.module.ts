import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductionPage } from './new-production';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewProductionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductionPage),AutoCompleteModule,
  ],
})
export class NewProductionPageModule {}
