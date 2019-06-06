import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCountryPage } from './select-country';

@NgModule({
  declarations: [
    SelectCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCountryPage),
  ],
})
export class SelectCountryPageModule {}
