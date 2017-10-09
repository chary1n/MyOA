import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';
@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
  // providers : [PopoverPage],
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
      this.navCtrl.push('PoContactPage', {
        items: eventData
      })
      this.events.unsubscribe('click:purchase.order');
      this.popover.dismiss();
    });

    this.events.subscribe('delivery', (eventData) => {
      this.navCtrl.push('DeliveryNotesPage', {
        items: eventData,
        type: "purchase"
      })
      this.events.unsubscribe('delivery');
      this.popover.dismiss();
    });
  }


  presentPopover(ev) {

    this.popover = this.popoverCtrl.create('PopoverOrderPage', {
      id: this.item.id
    });

    this.popover.present({
      ev: ev
    });
  }
}

