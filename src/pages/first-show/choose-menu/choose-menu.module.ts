import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseMenuPage } from './choose-menu';

@NgModule({
  declarations: [
    ChooseMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseMenuPage),
  ],
})
export class ChooseMenuPageModule {}
