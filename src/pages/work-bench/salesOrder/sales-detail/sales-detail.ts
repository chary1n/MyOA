import { Utils } from './../../../../providers/Utils';
import { CreateInvoicePage } from './create-invoice/create-invoice';
import { SalesSearvice } from './../salesService';
import { DeliveryPage } from './delivery/delivery';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Popover, AlertController, ToastController } from 'ionic-angular';
import { orderService} from './../../order/orderService';
import { DeliveryNotesPage} from './../../delivery-notes/delivery-notes'
import { PoContactPage} from './../../po-contact/po-contact'
/**
 * Generated class for the SalesDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sales-detail',
  templateUrl: 'sales-detail.html',
  providers: [SalesSearvice,orderService]
})
export class SalesDetailPage {
  popover: Popover;
  id: any;
  item: any = "";
  type: string


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public salesSearvice: SalesSearvice, private alertCtrl: AlertController,
    private toast:ToastController) {
    this.id = this.navParams.get('id');
    this.type = this.navParams.get("type");
    this.popover = this.popoverCtrl.create(PopoverPage, {
      item: this,
      id:this.id,
    });
    this.salesSearvice.getSalesOrderDetail(this.id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let detail =  res.result.res_data;
        detail.amount_total =  detail.amount_total.toFixed(2);
        detail.amount_untaxed = detail.amount_untaxed.toFixed(2);
        this.item =detail
        console.log(this.item)
      }
    })
  }

  ionViewWillLeave() {
    this.popover.dismiss()
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopoverPage, {
      item: this
    });
    this.popover.present({ ev: myEvent })
  }

  cancelOrder() {
    let alert = this.alertCtrl.create({
      message: '确定取消订单?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.doCancelOrder()
          }
        }
      ]
    });
    alert.present();
  }
  // 取消订单
  doCancelOrder() {
    this.salesSearvice.cancelOrder(this.id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.pop()
        }else{
          Utils.toastButtom(res.error.data.arguments[0],this.toast)
        }
      })
  }
  cancelOrdercreateInvoice() {
    this.navCtrl.push(CreateInvoicePage,{id:this.id})

  }
  conformSales() {
    let alert = this.alertCtrl.create({
      message: '确定转为销售订单?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.salesSearvice.confirmOrder(this.id)
              .then(res => {
                if (res.result && res.result.res_code == 1) {
                  let toast = this.toast.create({
                    message: '成功转为销售单',
                    duration: 1500,
                    position: 'middle'
                  });
                
                  toast.onDidDismiss(() => {
                    this.type = "salesOrder"
                    console.log(this.type + "this.type是")
                  });
                  toast.present();
                }
              })
          }
        }
      ]
    });
    alert.present();
  }
}


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
        this.salesDetailPage.navCtrl.push(DeliveryNotesPage, {
        items: res.result.res_data,
        type: "purchase"
      })
    }
    })

  }

  close(){
    this.orderServices.get_contact_phone_number(this.id, "sale.order").then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.salesDetailPage.navCtrl.push(PoContactPage, {
        items: res.result.res_data,
      })
      }
    })
  }
}
