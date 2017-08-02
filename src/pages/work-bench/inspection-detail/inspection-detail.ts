import { IncomingPage } from './../incoming/incoming';
import { IncomingDetailPage } from './../incoming-detail/incoming-detail';
import { APK_DOWNLOAD } from './../../../providers/Constants';
import { InspectionService } from './inspectionService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the InspectionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspection-detail',
  templateUrl: 'inspection-detail.html',
  providers: [InspectionService]
})
export class InspectionDetailPage {
  item: any;
  qc_note: string;
  qc_result: string;
  picture: Array<string>;
  qc_color: any;
  pack: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private inspectionService: InspectionService) {
    this.initData()
  }
  initData() {
    this.item = this.navParams.get('item')
    if (this.item.qc_result == 'success') {
      this.qc_result = '品检通过'
    } else {
      this.qc_result = '品检失败'
    }
    this.qc_note = this.item.qc_note
    let picture = []
    picture.push(this.item.qc_img)
    this.picture = picture
    let newPack = [];
    for (let product of this.item.pack_operation_product_ids) {
      if (product.pack_id != -1) {
        newPack.push(product)
      }
    }
    this.pack = newPack;
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionDetailPage');
  }
  clickBack() {
    let alert = this.alertCtrl.create({
      message: '是否全部退回?',
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
            this.doRequestBack()
          }
        }
      ]
    });
    alert.present();
  }

  doRequestBack() {
    this.inspectionService.requestBack(this.pack, this.item.picking_id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
           this.navCtrl.popTo(IncomingPage);
        }
        console.log(res)
      })
  }

  //是否品检通过
  isSpecial() {
    if (this.item.qc_result == 'success') {
      return true
    } else {
      return false
    }
  }

  noButton() {
    return false
  }

  agreeIncoming() {
    let rejectQTY = 0;
    let productQTY = 0;
    let QTYDone = 0;
    for (let item of this.item.pack_operation_product_ids) {
      rejectQTY += item.rejects_qty
      productQTY += item.product_qty
      QTYDone += item.qty_done
    }
    if (rejectQTY > 0) {
      // 有不良品
      this.contansBadProduct(QTYDone - rejectQTY, rejectQTY, productQTY, QTYDone)
    } else {
      this.checkIfHaveDebt(productQTY, QTYDone)
    }
  }

  // 是否有未完成数量
  checkIfHaveDebt(productQTY, QTYDone) {
    if (productQTY > QTYDone) {
      // 没有不良品有未完成数量
      this.alertCreateDebt()
    } else {
      // 入库调拨成功，等待入库
      this.alertWaitingIncoming()
    }
  }



  contansBadProduct(goodProduct, rejectQTY, productQTY, QTYDone) {
    let alert = this.alertCtrl.create({
      title: '请选择入库方式',
      message: '良品：' + goodProduct + ',不良品 ：' + rejectQTY,
      buttons: [
        {
          text: '全部入库',
          handler: () => {
            this.inspectionService.allIncoming(this.pack, this.item.picking_id)
              .then(res => {
                if (res.result && res.result.res_code == 1) {
                  this.checkIfHaveDebt(productQTY, QTYDone)
                }
              })
          }
        },
        {
          text: '仅良品入库，不良品退回',
          handler: () => {
            this.inspectionService.onlyGoodProductsIncoming(this.pack, this.item.picking_id)
              .then(res => {
                if (res.result && res.result.res_code == 1) {
                  this.checkIfHaveDebt(productQTY, QTYDone)
                }
              })
          }
        }, {
          text: '取消',
          role: 'cancel',
        }
      ]
    })
    alert.present()
  }


  alertCreateDebt() {
    let alert = this.alertCtrl.create({
      title: '请选择入库方式',
      message: "有未完成的数量，是否创建欠单",
      buttons: [
        {
          text: '创建欠单',
          handler: () => {
            this.inspectionService.createDebtOrder(this.pack, this.item.picking_id)
              .then(res => {
                if (res.result && res.result.res_code == 1) {
                  this.navCtrl.popTo(IncomingPage);
                }
                console.log(res)
              })
          }
        },
        {
          text: '没有欠单',
          handler: () => {
            this.inspectionService.noDebtOrder(this.pack, this.item.picking_id)
              .then(res => {
                if (res.result && res.result.res_code == 1) {
                  this.navCtrl.popTo(IncomingPage);
                }
                console.log(res)
              })
          }
        },
        {
          text: '取消',
          role: 'cancel',
        }
      ]
    })
    alert.present()
  }

  alertWaitingIncoming() {
    let alert = this.alertCtrl.create({
      title: '提示',
      message: "入库调拨成功，等待入库",
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.popTo(IncomingPage);
          }
        },
      ]
    })
    alert.present()
  }

}
