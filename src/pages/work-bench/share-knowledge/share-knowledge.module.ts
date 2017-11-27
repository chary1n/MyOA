import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareKnowledgePage } from './share-knowledge';

@NgModule({
  declarations: [
    ShareKnowledgePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareKnowledgePage),
  ],
})
export class ShareKnowledgePageModule {}
