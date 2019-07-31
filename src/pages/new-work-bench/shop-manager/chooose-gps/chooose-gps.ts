import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, Platform } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Geolocation } from '@ionic-native/geolocation';
import { ShopService } from './../shopService'
declare var GaoDe;
declare var BMap;
declare var BMapLib;
declare let startApp: any;

/**
 * Generated class for the ChoooseGpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chooose-gps',
  templateUrl: 'chooose-gps.html',
  providers: [Geolocation, ShopService],
})
export class ChoooseGpsPage {
  center_address
  map: any;
  now_lng
  now_lat
  frontPage
  pois_ids = []
  can_show_pois = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionSheetCtrl: ActionSheetController, public geolocation: Geolocation, public shopService: ShopService) {
    this.center_address = this.navParams.get('center_address')
    this.frontPage = Utils.getViewController('A', this.navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoooseGpsPage');
    this.getLocation()
  }

  getLocation() {
    var self = this
    var map = new BMap.Map("map_container_choose");
    var locate_icon = new BMap.Icon("", new BMap.Size(0, 0))
    var navigationControl = new BMap.GeolocationControl({
      // showAddressBar:false,
      // locationIcon: locate_icon,
    });
    map.addControl(navigationControl);
    map.enableScrollWheelZoom(true)
    function showInfo(e) {
      // alert(e.point.lng + ", " + e.point.lat);
      map.clearOverlays()
      var new_click_point = new BMap.Point(e.point.lng, e.point.lat)
      let marker = new BMap.Marker(new_click_point);
      map.panTo(new_click_point);
      marker.setPosition(new_click_point);
      map.addOverlay(marker);
      self.now_lng = e.point.lng
      self.now_lat = e.point.lat
      self.shopService.get_location_now(e.point.lat, e.point.lng, 500).then(res_location => {
        // console.log(res_location.result.pois[0].addr)
        // that.location_str = res_location.result.pois[0].addr

        self.pois_ids = res_location.result.pois
        if (self.pois_ids.length > 0) {
          self.can_show_pois = true
        }        // for (let item_new of res_location.result.pois) {
        //   console.log(item_new)
        // }
      })
    }
    map.addEventListener("click", showInfo);
    if (this.platform.is("android")) {
      var geolocation = new BMap.Geolocation();
      // geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function (r) {
        var locationPoint = new BMap.Point(r.point.lng, r.point.lat);
        map.centerAndZoom(locationPoint, 13);

        var new_click_point = new BMap.Point(r.point.lng, r.point.lat)
          let marker = new BMap.Marker(new_click_point);
          map.panTo(new_click_point);
          marker.setPosition(new_click_point);
          map.addOverlay(marker);
          self.now_lng = r.point.lng
          self.now_lat = r.point.lat
          self.shopService.get_location_now(r.point.lat, r.point.lng, 500).then(res_location => {
            self.pois_ids = res_location.result.pois
            if (self.pois_ids.length > 0) {
              self.can_show_pois = true
            }
          })
      }, {
          enableHighAccuracy: true,
          SDKLocation: true,
        })
    } else {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          this.shopService.trans_location_ios(resp.coords.latitude, resp.coords.longitude).then(res => {
            var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
              map.centerAndZoom(locationPoint, 13);

            var new_click_point = new BMap.Point(res.result[0].x, res.result[0].y)
            let marker = new BMap.Marker(new_click_point);
            map.panTo(new_click_point);
            marker.setPosition(new_click_point);
            map.addOverlay(marker);
            self.now_lng = res.result[0].x
            self.now_lat = res.result[0].y
            self.shopService.get_location_now(res.result[0].y, res.result[0].x, 500).then(res_location => {
              self.pois_ids = res_location.result.pois
              if (self.pois_ids.length > 0) {
                self.can_show_pois = true
              }
            })


            // if (this.center_address) {
            //   // var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
            //   map.centerAndZoom(this.center_address, 13);
            // }
            // else {
              // var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
              // map.centerAndZoom(locationPoint, 13);
            // }
          })


        }).catch((error) => {
          console.log('Error getting location', error);
        })

    }
  }

  click_Gaode(lng, lat) {
    if (this.platform.is('ios')) {
      var sApp = startApp.set("iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=NM&dev=0&t=0"); // iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0
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
        "uri": "amapuri://route/plan/?did=BGVIS2&dname=苏州中心&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径  
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

  click_baidu() {
    if (this.platform.is('ios')) {
      var sApp = startApp.set("baidumap://map/direction?destination=40.007623,116.360582&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo"); // iosamap://path?sourceApplication=OA&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0
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
          "uri": "bdapp://map/direction?destination=苏州中心&coord_type=bd09ll&mode=driving&src=andr.baidu.openAPIdemo",
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

  show_alert(self, lng, lat) {
    let actionSheet = self.actionSheetCtrl.create({
      title: '选择打开方式',
      buttons: [{
        text: '百度地图',
        handler: () => {
          this.click_baidu()
        }
      }, {
        text: '高德地图',
        handler: () => {
          self.click_Gaode(lng, lat)
        }
      }, {
        text: 'Apple地图',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
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

  goBack() {
    this.navCtrl.pop()
  }


  save_gps() {
    this.frontPage.data.need_update_gps = true
    this.frontPage.data.select_lng = this.now_lng
    this.frontPage.data.select_lat = this.now_lat
    this.frontPage.data.select_address = ''
    this.navCtrl.popTo(this.frontPage)
  }

  show_click() {
    this.can_show_pois = false
  }

  click_one_poi(item){
    this.frontPage.data.need_update_gps = true
    this.frontPage.data.select_lng = item.point.x
    this.frontPage.data.select_lat = item.point.y
    this.frontPage.data.select_address = item.addr
    this.navCtrl.popTo(this.frontPage)
  }
}
