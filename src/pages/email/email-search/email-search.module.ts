import { AutoCompleteModule } from 'ionic2-auto-complete';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailSearchPage } from './email-search';

@NgModule({
  declarations: [
    EmailSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailSearchPage),AutoCompleteModule
  ],
})
export class EmailSearchPageModule {}
