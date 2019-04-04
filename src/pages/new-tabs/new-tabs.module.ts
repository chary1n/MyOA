import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTabsPage } from './new-tabs';
import { FirstshowMenuPageModule} from '../first-show/firstshow-menu/firstshow-menu.module'
@NgModule({
  declarations: [
    NewTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTabsPage),FirstshowMenuPageModule
  ],
})
export class NewTabsPageModule {}
