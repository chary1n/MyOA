import { TreeModule,TreeComponent } from 'ng2-tree';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BomPage } from './bom';


@NgModule({
  declarations: [
    BomPage,
  ],
  imports: [
    IonicPageModule.forChild(BomPage),TreeModule
  ],
  exports: [
    BomPage
  ]
})
export class BomPageModule {}
