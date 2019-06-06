import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, ModalController, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeService } from './../../../../providers/NativeService';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';

declare let startApp: any;

declare var AMap;
/**
 * Generated class for the ModalLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-location',
  templateUrl: 'modal-location.html',
  providers: [NativeService],
})
export class ModalLocationPage {
  @ViewChild('myContent') myContent;
  item
  no_need_shop
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public nativeService: NativeService, public actionSheetCtrl: ActionSheetController,
    public toast: ToastController, public storage: Storage, public modalController: ModalController, public platform: Platform) {
    this.item = this.navParams.get('data_item')
    this.no_need_shop = this.navParams.get('no_need_shop')
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLocationPage');
  }

  click_dissmiss() {
    this.viewCtrl.dismiss()
  }

  goTo() {
    this.show_alert(this.item.name, this.item.rt_partner_shop_x, this.item.rt_partner_shop_y)
  }

  show_alert(name, lng, lat) {
    var self = this
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择打开方式',
      buttons: [{
        text: '百度地图',
        handler: () => {
          this.click_baidu(name, lng, lat)
        }
      }, {
        text: '高德地图',
        handler: () => {
          AMap.convertFrom([lng, lat], 'baidu', function (status, result) {
            if (result.info === 'ok') {
              var resLnglat = result.locations[0];
              console.log(result.locations[0].P)
              console.log(result.locations[0].Q)
              self.click_Gaode(name, result.locations[0].Q , result.locations[0].P)
            }
          });
          
        }
      }, 
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    actionSheet.present();
  }

  click_baidu(name, lng, lat) {
    if (this.platform.is('ios')) {
      var sApp = startApp.set("baidumap://map/direction?destination=" + lat + "," + lng + "&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo"); // iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0
      sApp.start(function () {
        // alert("OK");
      }, function (error) {
        alert('请先安装百度地图');
      });
    }
    else {
      let baiduApp = startApp.set(
        {
          "action": "ACTION_VIEW",
          "category": "CATEGORY_DEFAULT",
          "type": "text/css",
          "package": 'com.baidu.BaiduMap',
          "uri": "bdapp://map/direction?destination=" + lat + "," + lng + "&coord_type=bd09ll&mode=driving&src=andr.baidu.openAPIdemo",
          "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
          "intentstart": "startActivity",
        }
      );
      baiduApp.start(function () {
        // alert('baidu ok')
      }, function (error) {
        alert('请先安装百度地图')
      })
    }
  }

  click_Gaode(name, lng, lat) {
    console.log(name)
    console.log(lng)
    console.log(lat)
    if (this.platform.is('ios')) {
      console.log("iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=" + lat + "&dlon=" + lng + "&dname=" + '目的地' + "&dev=0&t=0")
      var sApp = startApp.set("iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=" + lat + "&dlon=" + lng + "&dname=&dev=0&t=0"); // iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0
      sApp.start(function () {
        // alert("OK");
      }, function (error) {
        alert('请先安装高德地图');
      });
    }
    else {
      let sApp = startApp.set({  //跳转对应APP 
        "action": "ACTION_VIEW",
        "category": "CATEGORY_DEFAULT",
        "type": "text/css",
        "package": "com.autonavi.minimap",
        "uri": "amapuri://route/plan/?did=BGVIS2&dlat=" + lat + "&dlon=" + lng + "&dname=" + name + "&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径  
        "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
        "intentstart": "startActivity",
      });
      sApp.start(function () { //跳转成功  
        // alert("OK");
      }, function (error) { //失败 
        alert('请先安装高德地图');
      })
    }

  }
  click_shop_detail(){
    this.viewCtrl.dismiss()
    this.navCtrl.push('ShopDetailPage', {
      item: {'shop_id': this.item.shop_id}
    })
  }
}
