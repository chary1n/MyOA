import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiSelectCountryPage } from './multi-select-country';

@NgModule({
  declarations: [
    MultiSelectCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(MultiSelectCountryPage),
  ],
})
export class MultiSelectCountryPageModule {}
