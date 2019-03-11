import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarDeatilpagePage } from './calendar-deatilpage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    CalendarDeatilpagePage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarDeatilpagePage),IonicImageViewerModule,
  ],
  entryComponents: [
  ],
})
export class CalendarDeatilpagePageModule {}
