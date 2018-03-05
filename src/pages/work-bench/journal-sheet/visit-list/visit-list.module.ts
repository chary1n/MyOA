import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitListPage } from './visit-list';

@NgModule({
  declarations: [
    VisitListPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitListPage),
  ],
})
export class VisitListPageModule {}
