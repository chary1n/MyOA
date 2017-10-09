import { ViewController, NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { orderService } from './../../../order/orderService';
@IonicPage()
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">联系电话</button>
      <button ion-item *ngIf="type=='salesOrder'" (click)="clickDelivery()">交货</button>
    </ion-list>
  `,
  providers: [orderService]
})
export class PopoverPage {

  salesDetailPage: any
  type ;
  id:any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
    public navParams: NavParams,public orderServices:orderService) {
    this.salesDetailPage = this.navParams.get("item");
    this.id = this.navParams.data.item.id;
    this.type = this.navParams.get("item").navParams.data.type 
  }

  clickDelivery() {
    this.orderServices.get_purchase_delivery_notes(this.id).then((res) =>{
      if (res.result && res.result.res_code == 1) {
        this.salesDetailPage.navCtrl.push('DeliveryNotesPage', {
        items: res.result.res_data,
        type: "purchase"
      })
    }
    })

  }

  close(){
    this.orderServices.get_contact_phone_number(this.id, "sale.order").then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.salesDetailPage.navCtrl.push('PoContactPage', {
        items: res.result.res_data,
      })
      }
    })
  }
}
