import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailDetailPage } from './email-detail';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    EmailDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailDetailPage)
  ],
})
export class EmailDetailPageModule {}
