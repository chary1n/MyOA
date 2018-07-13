import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentEditPage } from './content-edit';

@NgModule({
  declarations: [
    ContentEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentEditPage),
  ],
})
export class ContentEditPageModule {}
