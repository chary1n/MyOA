import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController} from 'ionic-angular';
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
  providers: [orderService,PoContactPage,DeliveryNotesPage]
})
export class PopoverPage {
  id:any;
  constructor(public viewCtrl: ViewController,public orderService:orderService,public pocontactCtrl:PoContactPage,public deliveryCtrl:DeliveryNotesPage) {
    this.id = viewCtrl.getNavParams().get('id');
    
  }
  close() {
    this.viewCtrl.dismiss();
  }
  click_phone()
  {
    
    this.orderService.get_contact_phone_number(this.id,"purchase.order").then((res) => {
        let item_detai = res.result.res_data;
         this.viewCtrl.getNav().push(PoContactPage, {
            items: item_detai
          })
    
    })
  }
  delivery(){
    this.orderService.get_delivery_notes(this.id).then((res) => {
      let item_detai = res.result.res_data;
      if (item_detai)
      {
        this.viewCtrl.getNav().push(DeliveryNotesPage, {
            items: item_detai,
            type: "purchase"
          })
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
  item :any 
  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
   this.item =navParams.get('item').res_data
   console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  presentPopover(ev) {
    
    let popover = this.popoverCtrl.create(PopoverPage, {
         id:this.item.id
    });

    popover.present({
      ev: ev
    });
  }
}

