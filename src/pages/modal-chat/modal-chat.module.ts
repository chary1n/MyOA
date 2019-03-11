import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalChatPage } from './modal-chat';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    ModalChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalChatPage),IonicImageViewerModule
  ],
})
export class ModalChatPageModule {}
