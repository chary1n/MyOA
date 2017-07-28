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
   providers:[InspectionService]
})
export class InspectionDetailPage {
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private inspectionService: InspectionService) {
    this.item = navParams.get('item')
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
    let newPack = [] ;
    for(let product of this.item.pack_operation_product_ids ){
      if(product.pack_id!=-1){
        newPack.push(product)
      }
    }
    this.inspectionService.requestBack(newPack,this.item.picking_id)
    .then(res=>{
      console.log(res)
    })
  }

  agreeIncoming() {

  }

}
