import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,ToastController } from 'ionic-angular';
import { orderService } from '../order/orderService';
import { PoContactPage } from './../po-contact/po-contact';
import { DeliveryNotesPage } from './../delivery-notes/delivery-notes';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';


@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
  providers : [orderService],
})
export class OrderDetailPage {

  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  item: any
  popover: any
  showNumber: boolean
  is_manager = false
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public events: Events,
    public storage:Storage,public orderService: orderService,public toast:ToastController) {
    this.item = navParams.get('item').res_data
    this.showNumber = navParams.get('showNumber');
    this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res);
        for (let product of res.result.res_data.groups) {
          if (product.name == 'group_purchase_manager')
            {
              this.is_manager = true
            }
        }
      })
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

  toProductDetail(detail){
    this.navCtrl.push("ProductDetailPage",{"data":detail})
  }


  presentPopover(ev) {

    this.popover = this.popoverCtrl.create('PopoverOrderPage', {
      id: this.item.id
    });

    this.popover.present({
      ev: ev
    });
  }

  approve(){
    this.orderService.button_approve(this.item.id).then(res => {
      console.log(res)
      if (res.result.res_code == 1)
      {
        Utils.toastButtom("批准成功", this.toast)
        // this.frontPage.data.need_fresh = true;
                this.navCtrl.pop();
      }
    })
  }
}

