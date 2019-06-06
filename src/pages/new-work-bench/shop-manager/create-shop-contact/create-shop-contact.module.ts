import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateShopContactPage } from './create-shop-contact';

@NgModule({
  declarations: [
    CreateShopContactPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateShopContactPage),
  ],
})
export class CreateShopContactPageModule {}
