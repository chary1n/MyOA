import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEventPage } from './list-event';

@NgModule({
  declarations: [
    ListEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEventPage),
  ],
})
export class ListEventPageModule {}
