import {  TreeModule } from 'ng2-tree';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailMenuPage } from './email-menu';

@NgModule({
  declarations: [
    EmailMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailMenuPage),TreeModule
  ],
})
export class EmailMenuPageModule {}
