import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeletePicturePage } from './delete-picture';

@NgModule({
  declarations: [
    DeletePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(DeletePicturePage),
  ],
})
export class DeletePicturePageModule {}
