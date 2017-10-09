import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController,Events} from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ReturnPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  template: `
    <ion-list>
      <button ion-item tappable (click)="click_phone()">联系电话</button>
      <button ion-item tappable (click)="delivery_back()">交货</button>
    </ion-list>
  `,
  providers: [orderService,PoContactPage,CallNumber]
})
export class ReturnPopoverPage {
  id:any;
  
  constructor(public viewCtrl: ViewController,public orderService:orderService,public pocontactCtrl:PoContactPage,public events: Events) {
    this.id = viewCtrl.getNavParams().get('id');
    
  }
  close() {
    this.viewCtrl.dismiss();
  }
  click_phone()
  {
    
    this.orderService.get_contact_phone_number(this.id,"return.goods").then((res) => {
        let item_detai = res.result.res_data;
        if (item_detai)
        {
          this.events.publish('click:return.goods', item_detai);
        }
         
         
    
    })
  }
  

  delivery_back()
  {
    this.orderService.get_back_delivery_notes(this.id).then((res) => {
        let item_detai = res.result.res_data;
        if (item_detai)
        {
          this.events.publish('delivery_back', item_detai);
          
      }
    })
  }
}
