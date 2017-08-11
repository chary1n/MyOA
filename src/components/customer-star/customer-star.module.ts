import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomerStarComponent } from './customer-star';

@NgModule({
  declarations: [
    CustomerStarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CustomerStarComponent
  ]
})
export class CustomerStarComponentModule {}
