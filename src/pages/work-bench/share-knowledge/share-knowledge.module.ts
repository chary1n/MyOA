import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareKnowledgePage } from './share-knowledge';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ShareKnowledgePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareKnowledgePage),AutoCompleteModule
  ],
})
export class ShareKnowledgePageModule {}
