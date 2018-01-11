import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoCanSeePage } from './who-can-see';

@NgModule({
  declarations: [
    WhoCanSeePage,
  ],
  imports: [
    IonicPageModule.forChild(WhoCanSeePage),
  ],
})
export class WhoCanSeePageModule {}
