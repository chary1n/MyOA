import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';

@Component({
  template: `
    <ion-list>
      <button ion-item tappable (click)="click_phone()">联系电话</button>
      <button ion-item tappable (click)="delivery()">送货</button>
    </ion-list>
  `,
  providers: [orderService, PoContactPage, DeliveryNotesPage]
})
export class PopoverPage {
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

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',

})
export class OrderDetailPage {

  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  item: any
  popover: any
  showNumber: boolean
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public events: Events) {
    this.item = navParams.get('item').res_data
    this.showNumber = navParams.get('showNumber');
    console.log(this.item)
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  ionViewDidEnter() {
    this.events.unsubscribe('click:purchase.order');
    this.events.unsubscribe('delivery');
    this.events.subscribe('click:purchase.order', (eventData) => {
      this.navCtrl.push(PoContactPage, {
        items: eventData
      })
      this.events.unsubscribe('click:purchase.order');
      this.popover.dismiss();
    });

    this.events.subscribe('delivery', (eventData) => {
      this.navCtrl.push(DeliveryNotesPage, {
        items: eventData,
        type: "purchase"
      })
      this.events.unsubscribe('delivery');
      this.popover.dismiss();
    });
  }


  presentPopover(ev) {

    this.popover = this.popoverCtrl.create(PopoverPage, {
      id: this.item.id
    });

    this.popover.present({
      ev: ev
    });
  }
}

