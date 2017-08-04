import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController} from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';
@Component({
  template: `
    <ion-list>
      <button ion-item tappable (click)="click_phone()">联系电话</button>
      <button ion-item tappable (click)="delivery_back()">交货</button>
    </ion-list>
  `,
  providers: [orderService,PoContactPage]
})
export class ReturnPopoverPage {
  id:any;
  
  constructor(public viewCtrl: ViewController,public orderService:orderService,public pocontactCtrl:PoContactPage) {
    this.id = viewCtrl.getNavParams().get('id');
    
  }
  close() {
    this.viewCtrl.dismiss();
  }
  click_phone()
  {
    
    this.orderService.get_contact_phone_number(this.id,"return.goods").then((res) => {
        let item_detai = res.result.res_data;
         this.viewCtrl.getNav().push(PoContactPage, {
            items: item_detai,
            type:"back_order"
          })
    
    })
  }

  delivery_back()
  {
    this.orderService.get_back_delivery_notes(this.id).then((res) => {
        let item_detai = res.result.res_data;
        if (item_detai)
        {
          this.viewCtrl.getNav().push(DeliveryNotesPage, {
              items: item_detai,
             type: "back_order"
           })
      }
    })
  }
}

@IonicPage()
@Component({
  selector: 'page-return-order-detail',
  templateUrl: 'return-order-detail.html',
})
export class ReturnOrderDetailPage {
  item: any
  id:any
  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
    this.item = navParams.get('item').res_data;
    this.id = navParams.get('id');
    // console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnOrderDetailPage');
  }

  presentPopover(ev) {
    
    let popover = this.popoverCtrl.create(ReturnPopoverPage, {
         id:this.id
    });

    popover.present({
      ev: ev
    });
  }

}
