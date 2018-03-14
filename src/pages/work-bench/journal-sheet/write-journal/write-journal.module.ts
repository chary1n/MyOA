import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteJournalPage } from './write-journal';

@NgModule({
  declarations: [
    WriteJournalPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteJournalPage),
  ],
})
export class WriteJournalPageModule {}
