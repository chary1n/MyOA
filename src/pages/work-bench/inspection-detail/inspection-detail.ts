import { Utils } from './../../../providers/Utils';
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
  mIncomingDetailPage: any;
  isClick = false;
  showFenjian = false ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private inspectionService: InspectionService, ) {
    this.item = this.navParams.get('item')
    this.initData(this.item)
    this.mIncomingDetailPage = Utils.getViewController("IncomingDetailPage", navCtrl)
  }
  initData(mitem) {
    this.item = mitem
    let rejectQTY = 0;
    for (let item of this.item.pack_operation_product_ids) {
      rejectQTY += item.rejects_qty
    }
    if(rejectQTY>0){
      this.showFenjian = true ;
    }
    if (this.item.qc_result == 'success') {
      this.qc_result = '品检通过'
    } else if (this.item.qc_result == 'no_result') {
      this.qc_result = '为以前的品检单,无品检结果记录	'
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
    let self = this
    this.inspectionService.requestBack(this.pack, this.item.picking_id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          self.mIncomingDetailPage.data.item = res.result.res_data;
          this.initData(res.result.res_data);
          self.mIncomingDetailPage.data.isPop = true;
          self.navCtrl.popTo(self.mIncomingDetailPage);
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
      if (!this.isClick) {
        this.contansBadProduct(QTYDone - rejectQTY, rejectQTY, productQTY, QTYDone)
      } else {
        this.contansBadProduct(QTYDone, rejectQTY, productQTY, QTYDone)
      }
    } else {
      this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, true)
    }
  }

  // 是否有未完成数量 如果不是全部入库，要减去不良品的数量
  checkIfHaveDebt(productQTY, QTYDone, rejectQTY, isALL) {
    if (isALL) {
      if (productQTY > QTYDone) {
        // 有未完成数量
        this.alertCreateDebt()
      } else {
        // 入库调拨成功，等待入库
        this.alertWaitingIncoming()
      }
    } else {
      if (productQTY > QTYDone - rejectQTY) {
        // 有未完成数量
        this.alertCreateDebt()
      } else {
        // 入库调拨成功，等待入库
        this.alertWaitingIncoming()
      }
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
                  this.initData(res.result.res_data);
                  this.isClick = true;
                  this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, true)
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
                  this.initData(res.result.res_data);
                  this.isClick = true;
                  this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, false)
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
    var self = this
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
                  self.mIncomingDetailPage.data.item = res.result.res_data;
                  this.initData(res.result.res_data);
                  self.mIncomingDetailPage.data.isPop = true;
                  self.navCtrl.popTo(self.mIncomingDetailPage);
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
                  self.mIncomingDetailPage.data.item = res.result.res_data;
                  this.initData(res.result.res_data);
                  self.mIncomingDetailPage.data.isPop = true;
                  self.navCtrl.popTo(self.mIncomingDetailPage);
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


  goFenJian() {
    let self = this
    let alert = this.alertCtrl.create({
      title: "提示",
      subTitle: '确定全部送去分拣?',
      message: "说明:分拣后将按照分拣结果良品入库,不良品退回",
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
            this.inspectionService.goFenjian(this.pack, this.item.picking_id)
            .then(res => {
                if (res.result && res.result.res_code == 1) {
                  this.initData(res.result.res_data);
                  this.isClick = true;
                  let rejectQTY = 0;
                  let productQTY = 0;
                  let QTYDone = 0;
                  for (let item of this.item.pack_operation_product_ids) {
                    rejectQTY += item.rejects_qty
                    productQTY += item.product_qty
                    QTYDone += item.qty_done
                  }
                  if (productQTY > QTYDone - rejectQTY) {
                    // 有未完成数量
                    this.alertCreateDebt()
                  } else {
                    // 入库调拨成功，等待分拣
                    this.alertWaitingFenjian()
                  }
              }
              console.log(res)
            })
          }
        }
      ]
    });
    alert.present();
  }



  alertWaitingIncoming() {
    let self = this
    this.inspectionService.noDebtOrder(this.pack, this.item.picking_id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          self.mIncomingDetailPage.data.item = res.result.res_data;
          this.initData(res.result.res_data);
          self.mIncomingDetailPage.data.isPop = true;
          let alert = this.alertCtrl.create({
            title: '提示',
            message: "入库调拨成功，等待入库",
            buttons: [
              {
                text: '确定',
                handler: () => {
                  self.navCtrl.popTo(self.mIncomingDetailPage);
                }
              },
            ]
          })
          alert.present()
        }
        console.log(res)
      })
  }


  alertWaitingFenjian() {
    let self = this
    this.inspectionService.noDebtOrder(this.pack, this.item.picking_id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          self.mIncomingDetailPage.data.item = res.result.res_data;
          this.initData(res.result.res_data);
          self.mIncomingDetailPage.data.isPop = true;
          let alert = this.alertCtrl.create({
            title: '提示',
            message: "入库调拨成功，等待分拣",
            buttons: [
              {
                text: '确定',
                handler: () => {
                  self.navCtrl.popTo(self.mIncomingDetailPage);
                }
              },
            ]
          })
          alert.present()
        }
        console.log(res)
      })
  }

}
