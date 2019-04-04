import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstshowMenuPage } from './firstshow-menu';
import { FirstShowPageModule} from './../first-show.module'
@NgModule({
  declarations: [
    FirstshowMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstshowMenuPage),FirstShowPageModule
  ],
})
export class FirstshowMenuPageModule {}
