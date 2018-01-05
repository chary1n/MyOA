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
  type: string ;
  state ;
  jiaohuoLength ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public salesSearvice: SalesSearvice, private alertCtrl: AlertController,
    private toast:ToastController) {
    this.id = this.navParams.get('id');
    this.type = this.navParams.get("type");
    this.popover = this.popoverCtrl.create('PopoverPage', {
      item: this,
      id:this.id,
    });
    this.salesSearvice.getSalesOrderDetail(this.id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let detail =  res.result.res_data;
        this.item =detail
        this.jiaohuoLength = this.item.picking_ids.length
        if(!this.jiaohuoLength){
          this.jiaohuoLength = 0
        }
        this.state = detail.state 
        console.log(this.item)
      }
    })
  }

  ionViewWillLeave() {
    this.popover.dismiss()
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create('PopoverPage', {
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

  setToQuotes(){
    this.salesSearvice.setToQuotes(this.id).then(res=>{
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.pop()
      }
    })
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
                console.log(res);
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
                else{
                  let toast = this.toast.create({
                    message: '未设置税金',
                    duration: 1500,
                    position: 'middle'
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

  toProductDetail(detail){
      this.navCtrl.push('BaojiaDetailPage',{'detail':detail})
  }

  toJiaohuoDetail(){
    if(this.jiaohuoLength){
      this.navCtrl.push('JiaohuoListPage',{id:this.id})
    }
  }
}

