import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalSheetPage } from './journal-sheet';

@NgModule({
  declarations: [
    JournalSheetPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalSheetPage),
  ],
})
export class JournalSheetPageModule {}
