import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStockMovePage } from './new-stock-move';

@NgModule({
  declarations: [
    NewStockMovePage,
  ],
  imports: [
    IonicPageModule.forChild(NewStockMovePage),
  ],
})
export class NewStockMovePageModule {}
