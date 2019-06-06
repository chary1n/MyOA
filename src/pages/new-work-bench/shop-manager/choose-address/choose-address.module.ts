import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseAddressPage } from './choose-address';
import { MultiPickerModule } from 'ion-multi-picker'
@NgModule({
  declarations: [
    ChooseAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseAddressPage),MultiPickerModule
  ],
})
export class ChooseAddressPageModule {}
