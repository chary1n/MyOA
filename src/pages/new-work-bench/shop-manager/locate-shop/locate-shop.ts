import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, Platform, ModalController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Geolocation } from '@ionic-native/geolocation';
import { ShopService } from './../shopService'
declare var GaoDe;
declare var BMap;
declare var BMapLib;
declare let startApp: any;
declare var AMap;
/**
 * Generated class for the LocateShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-locate-shop',
  templateUrl: 'locate-shop.html',
  providers: [Geolocation, ShopService],
})
export class LocateShopPage {
  item
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public shopService: ShopService, public geolocation: Geolocation, public modalController: ModalController) {
    this.item = this.navParams.get('item')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocateShopPage');
    this.initMap()
  }

  initMap() {
    var self = this
    var map = new BMap.Map("map_container");
    map.enableScrollWheelZoom(true)
    var myGeo = new BMap.Geocoder()
    if (this.item.detailed_address) {
      myGeo.getPoint(this.item.detailed_address, function (point) {
        if (point) {
          var locationPoint = new BMap.Point(point.lng, point.lat);
          map.centerAndZoom(locationPoint, 13);
          self.item.rt_partner_shop_x = point.lng
          self.item.rt_partner_shop_y = point.lat
          let modal = self.modalController.create("ModalLocationPage", {
            'data_item': self.item,
            'no_need_shop': true,
          })
          modal.present()
          let marker = new BMap.Marker(locationPoint);
          map.panTo(locationPoint);
          marker.setPosition(locationPoint);
          map.addOverlay(marker);
          map.addEventListener("click", function () {
            let modal = self.modalController.create("ModalLocationPage", {
              'data_item': self.item,
              'no_need_shop': true,
            })
            modal.present()
          })
        }
        else {
          var locationPoint = new BMap.Point(self.item.rt_partner_shop_x, self.item.rt_partner_shop_y);
          map.centerAndZoom(locationPoint, 13);
          let modal = self.modalController.create("ModalLocationPage", {
            'data_item': self.item,
            'no_need_shop': true,
          })
          modal.present()
          let marker = new BMap.Marker(locationPoint);
          map.panTo(locationPoint);
          marker.setPosition(locationPoint);
          map.addOverlay(marker);
          map.addEventListener("click", function () {
            let modal = self.modalController.create("ModalLocationPage", {
              'data_item': self.item,
              'no_need_shop': true,
            })
            modal.present()
          })
        }
      })
    }
    else {
      var locationPoint = new BMap.Point(self.item.rt_partner_shop_x, self.item.rt_partner_shop_y);
      map.centerAndZoom(locationPoint, 13);
      let modal = self.modalController.create("ModalLocationPage", {
        'data_item': self.item,
        'no_need_shop': true,
      })
      modal.present()
      let marker = new BMap.Marker(locationPoint);
      map.panTo(locationPoint);
      marker.setPosition(locationPoint);
      map.addOverlay(marker);
      map.addEventListener("click", function () {
        let modal = self.modalController.create("ModalLocationPage", {
          'data_item': self.item,
          'no_need_shop': true,
        })
        modal.present()
      })
    }

  }

  goBack() {
    this.navCtrl.pop()
  }

}
