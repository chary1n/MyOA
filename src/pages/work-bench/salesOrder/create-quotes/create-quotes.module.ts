import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuotesPage } from './create-quotes';

@NgModule({
  declarations: [
    CreateQuotesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQuotesPage),
  ],
  exports: [
    CreateQuotesPage
  ]
})
export class CreateQuotesPageModule {}
