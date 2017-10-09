import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController,Events} from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';


@IonicPage()
@Component({
  selector: 'page-return-order-detail',
  templateUrl: 'return-order-detail.html',
})
export class ReturnOrderDetailPage {
  item: any
  id:any
  popover:any
  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController,public events: Events) {
    this.item = navParams.get('item').res_data;
    this.id = navParams.get('id');
    // console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnOrderDetailPage');
  }

  ionViewDidEnter(){
    this.events.unsubscribe('click:return.goods');
    this.events.unsubscribe('delivery_back');
    this.events.subscribe('click:return.goods', (eventData) => {
      this.navCtrl.push('PoContactPage', {
            items: eventData,
            type:"back_order"
          })
      this.events.unsubscribe('click:return.goods');
      this.popover.dismiss();     
    });

    this.events.subscribe('delivery_back', (eventData) => {
      this.navCtrl.push('DeliveryNotesPage', {
              items: eventData,
             type: "back_order"
           })
      this.events.unsubscribe('delivery_back');
      this.popover.dismiss();     
    });
  }

  presentPopover(ev) {
    
    this.popover = this.popoverCtrl.create('ReturnPopoverPage', {
         id:this.id
    });

    this.popover.present({
      ev: ev
    });
  }

}
