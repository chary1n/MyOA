import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteChatPicturePage } from './delete-chat-picture';

@NgModule({
  declarations: [
    DeleteChatPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteChatPicturePage),
  ],
})
export class DeleteChatPicturePageModule {}
