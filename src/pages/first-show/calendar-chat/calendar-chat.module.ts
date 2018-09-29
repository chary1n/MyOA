import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarChatPage } from './calendar-chat';

@NgModule({
  declarations: [
    CalendarChatPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarChatPage),
  ],
})
export class CalendarChatPageModule {}
