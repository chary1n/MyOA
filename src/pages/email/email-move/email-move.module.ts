import { TreeModule } from 'ng2-tree';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailMovePage } from './email-move';

@NgModule({
  declarations: [
    EmailMovePage,
  ],
  imports: [
    IonicPageModule.forChild(EmailMovePage),TreeModule
  ],
})
export class EmailMovePageModule {}
