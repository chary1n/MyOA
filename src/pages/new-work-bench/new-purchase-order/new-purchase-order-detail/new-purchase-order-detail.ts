import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events, ToastController, AlertController } from 'ionic-angular';
import { PoService } from './../PoService';

import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the NewPurchaseOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-purchase-order-detail',
  templateUrl: 'new-purchase-order-detail.html',
  providers: [PoService],
})
export class NewPurchaseOrderDetailPage {

  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  item: any
  popover: any
  showNumber: boolean
  is_manager = false
  frontPage
  state
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public events: Events,
    public storage: Storage, public orderService: PoService, public toast: ToastController, public alertCtrl: AlertController) {
    this.item = navParams.get('item').res_data
    this.state = navParams.get('state')
    this.showNumber = navParams.get('showNumber');
    this.frontPage = Utils.getViewController(navParams.get('frontPage'), navCtrl)
    console.log(this.state)
    this.storage.get('user')
      .then(res => {
        console.log(res);
        this.uid = res.result.res_data.user_id
        if (this.state == "reviewing") {
          if (res.result.res_data.user_id == this.item.manager_id) {
            this.is_manager = true
          }
        }
        else {
          this.is_manager = false
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

  toProductDetail(detail) {
    this.navCtrl.push("NewProductDetailPage", { "data": detail })
  }


  presentPopover(ev) {

    this.popover = this.popoverCtrl.create('PopoverOrderPage', {
      id: this.item.id
    });

    this.popover.present({
      ev: ev
    });
  }

  approve() {
    // this.orderService.button_approve(this.item.id).then(res => {
    //   console.log(res)
    //   if (res.result.res_code == 1)
    //   {
    //     Utils.toastButtom("批准成功", this.toast)
    //     // this.frontPage.data.need_fresh = true;
    //             this.navCtrl.pop();
    //   }
    // })
  }

  changeDate(date) {
    if (date != ''){
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
    
  }

  goBack() {
    this.navCtrl.pop()
  }

  conform() {
    this.orderService.confirm_po({ 'po_id': this.item.id, 'uid': this.uid }).then(res => {
      if (res.result && res.result.res_code == 1) {
        Utils.toastButtom("审核通过", this.toast)
        this.frontPage.data.need_fresh = true;
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

  cancel() {
    this.showPrompt();
  }

  showPrompt() {
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              this.orderService.cancel_po({ 'po_id': this.item.id, 'uid': this.uid, 'text': data.title }).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("拒绝成功", this.toast)
                  this.frontPage.data.need_fresh = true;
                  this.navCtrl.popTo(this.frontPage);
                }
              })
            }
            else {
              ctrl.create({
                title: '提示',
                subTitle: "请填写拒绝原因",
                buttons: [{
                  text: '确定',
                  handler: () => {

                  }
                }
                ]
              }).present();
            }
          }
        }
      ]
    }).present();
  }
}

