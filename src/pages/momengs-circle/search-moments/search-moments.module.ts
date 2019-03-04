import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMomentsPage } from './search-moments';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    SearchMomentsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMomentsPage),AutoCompleteModule, IonicImageViewerModule
  ],
})
export class SearchMomentsPageModule {}
