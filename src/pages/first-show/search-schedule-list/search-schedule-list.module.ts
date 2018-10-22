import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchScheduleListPage } from './search-schedule-list';

@NgModule({
  declarations: [
    SearchScheduleListPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchScheduleListPage),
  ],
})
export class SearchScheduleListPageModule {}
