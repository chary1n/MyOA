import { Component, } from '@angular/core';
import { IonicPage,  ViewController, Events } from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <button ion-item tappable (click)="click_phone()">联系电话</button>
      <button ion-item tappable (click)="delivery()">送货</button>
    </ion-list>
  `,
  providers: [orderService, PoContactPage, DeliveryNotesPage,CallNumber]
})
export class PopoverOrderPage {
  id: any;
  constructor(public viewCtrl: ViewController, public orderService: orderService, public pocontactCtrl: PoContactPage, public deliveryCtrl: DeliveryNotesPage, public events: Events) {
    this.id = viewCtrl.getNavParams().get('id');

  }
  close() {
    this.viewCtrl.dismiss();
  }
  click_phone() {
    this.orderService.get_contact_phone_number(this.id, "purchase.order").then((res) => {
      let item_detai = res.result.res_data;
      if (item_detai) {
        this.events.publish('click:purchase.order', item_detai);
      }
    })
  }
  delivery() {
    this.orderService.get_delivery_notes(this.id).then((res) => {
      let item_detai = res.result.res_data;
      if (item_detai) {
        this.events.publish('delivery', item_detai);
      }
    })
  }

}