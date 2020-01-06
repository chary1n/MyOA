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
 * Generated class for the SearchGpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-gps',
  templateUrl: 'search-gps.html',
  providers: [Geolocation, ShopService],
})
export class SearchGpsPage {
  total_gps = []

  is_need_back = false

  frontPage

  zoom_size = 15

  user_id

  meters = 1000

  circle_arr = []

  now_center
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public shopService: ShopService, public geolocation: Geolocation, public modalController: ModalController) {
    this.is_need_back = this.navParams.get('is_need_back')
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController('SecView', this.navCtrl)
    // var myGeo = new BMap.Geocoder()
    //             myGeo.getPoint('苏州市吴中区星汉街5号腾飞工业坊', function (point) {
    //               if(point){

    //               }
    //             })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchGpsPage');
    this.initMap()
  }

  initMap() {
    var self = this
    var map = new BMap.Map("map_container");
    map.enableScrollWheelZoom(true)
    // 添加带有定位的导航控件
    var locate_icon = new BMap.Icon("", new BMap.Size(0, 0))
    var navigationControl = new BMap.GeolocationControl({
      // showAddressBar: false,
      // locationIcon: locate_icon,
    });
    map.addControl(navigationControl);
    function showInfo(e) {
      if (e.overlay == null) {
        map.clearOverlays()
        self.circle_arr = []
        var new_click_point = new BMap.Point(e.point.lng, e.point.lat)
        self.now_center = new_click_point
        // var myIcon = new BMap.Icon("assets/img/adjust_department.png", new BMap.Size(20,20));
        // let marker = new BMap.Marker(new_click_point,{icon:myIcon});
        let marker = new BMap.Marker(new_click_point);
        map.panTo(new_click_point);
        marker.setPosition(new_click_point);
        map.addOverlay(marker);
        map.centerAndZoom(new_click_point, self.zoom_size);
        var circle = new BMap.Circle(new_click_point, self.meters, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
        self.shopService.get_total_shop_gps_new({'lng': e.point.lng, 'lat': e.point.lat, 'distance': self.meters}).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            for (let i = 0; i < res.result.res_data.length; i++) {
              if (res.result.res_data[i].rt_partner_shop_x == 0 && res.result.res_data[i].rt_partner_shop_y == 0) {
                var myGeo = new BMap.Geocoder()
                myGeo.getPoint(res.result.res_data[i].detailed_address, function (point) {
                  if (point) {
                    var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                    if (result) {
                      res.result.res_data[i]['rt_partner_shop_x'] = point.lng
                      res.result.res_data[i]['rt_partner_shop_y'] = point.lat
                      var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                      label.setStyle({
                        color: "white", //字体颜色
                        fontSize: "16px",//字体大小 
                        backgroundColor: "#2597ec", //文本标注背景颜色　
                        border: "0",
                        fontWeight: "bold", //字体加粗
                        padding: "7px",
                        borderRadius: "20px",
                      });
                      label.addEventListener("click", function () {
                        if (self.is_need_back) {
                          self.frontPage.data.need_update_shop = true
                          self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                          self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                          self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                          self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                          self.navCtrl.popTo(self.frontPage)
                        }
                        else {
                          let modal = self.modalController.create("ModalLocationPage", {
                            'data_item': res.result.res_data[i],
                            'user_id': self.user_id,
                          })
                          modal.present()
                        }
                      })
                      self.circle_arr.push(label)
                      if (self.circle_arr.length > 0) {
                        self.add_circle(new_click_point, self.circle_arr.length, self.circle_arr, self, map)
                      }
                      // map.addOverlay(label);
                    }
                  }
                });
              }
              else {
                var point = new BMap.Point(res.result.res_data[i].rt_partner_shop_x, res.result.res_data[i].rt_partner_shop_y);
                var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                console.log(result)
                if (result) {
                  var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                  label.setStyle({
                    color: "white", //字体颜色
                    fontSize: "16px",//字体大小 
                    backgroundColor: "#2597ec", //文本标注背景颜色　
                    border: "0",
                    fontWeight: "bold", //字体加粗
                    padding: "7px",
                    borderRadius: "20px",
                  });
                  label.addEventListener("click", function () {

                    if (self.is_need_back) {
                      self.frontPage.data.need_update_shop = true
                      self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                      self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                      self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                      self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                      self.navCtrl.popTo(self.frontPage)
                    }
                    else {
                      let modal = self.modalController.create("ModalLocationPage", {
                        'data_item': res.result.res_data[i],
                        'user_id': self.user_id,
                      })
                      modal.present()
                    }
                  })
                  self.circle_arr.push(label)
                  // map.addOverlay(label);
                }
              }

            }

          }
        })
      }
    }
    map.addEventListener("click", showInfo);
    map.addEventListener("zoomend", function (e) {
      var ZoomNum = map.getZoom();
      if (self.circle_arr.length > 0) {
        map.clearOverlays()
        if (ZoomNum >= 17) {
          for (var i = 0; i < self.circle_arr.length; i++) {
            map.addOverlay(self.circle_arr[i])
          }
        }
        else {
          self.add_circle(self.now_center, self.circle_arr.length, self.circle_arr, self, map)
        }
      }
    });
    if (this.platform.is("android")) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        console.log(r.point.lat)
        map.centerAndZoom(r.point, self.zoom_size);
        var circle = new BMap.Circle(r.point, self.meters, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
        self.shopService.get_total_shop_gps_new({'lng': r.point.lng,'lat': r.point.lat, 'distance': self.meters}).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            for (let i = 0; i < res.result.res_data.length; i++) {
              if (res.result.res_data[i].rt_partner_shop_x == 0 && res.result.res_data[i].rt_partner_shop_y == 0) {
                var myGeo = new BMap.Geocoder()
                myGeo.getPoint(res.result.res_data[i].detailed_address, function (point) {
                  if (point) {
                    var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                    if (result) {
                      res.result.res_data[i]['rt_partner_shop_x'] = point.lng
                      res.result.res_data[i]['rt_partner_shop_y'] = point.lat
                      var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                      label.setStyle({
                        color: "white", //字体颜色
                        fontSize: "16px",//字体大小 
                        backgroundColor: "#2597ec", //文本标注背景颜色　
                        border: "0",
                        fontWeight: "bold", //字体加粗
                        padding: "7px",
                        borderRadius: "20px",
                      });
                      label.addEventListener("click", function () {

                        if (self.is_need_back) {
                          self.frontPage.data.need_update_shop = true
                          self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                          self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                          self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                          self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                          self.navCtrl.popTo(self.frontPage)
                        }
                        else {
                          let modal = self.modalController.create("ModalLocationPage", {
                            'data_item': res.result.res_data[i],
                            'user_id': self.user_id,
                          })
                          modal.present()
                        }
                      })
                      // map.addOverlay(label);
                      self.circle_arr.push(label)
                    }
                  }
                });
              }
              else {
                var point = new BMap.Point(res.result.res_data[i].rt_partner_shop_x, res.result.res_data[i].rt_partner_shop_y);
                var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                console.log(result)
                if (result) {
                  var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                  label.setStyle({
                    color: "white", //字体颜色
                    fontSize: "16px",//字体大小 
                    backgroundColor: "#2597ec", //文本标注背景颜色　
                    border: "0",
                    fontWeight: "bold", //字体加粗
                    padding: "7px",
                    borderRadius: "20px",
                  });
                  label.addEventListener("click", function () {

                    if (self.is_need_back) {
                      self.frontPage.data.need_update_shop = true
                      self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                      self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                      self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                      self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                      self.navCtrl.popTo(self.frontPage)
                    }
                    else {
                      let modal = self.modalController.create("ModalLocationPage", {
                        'data_item': res.result.res_data[i],
                        'user_id': self.user_id,
                      })
                      modal.present()
                    }
                  })
                  // map.addOverlay(label);
                  self.circle_arr.push(label)
                }
              }

            }
            if (self.circle_arr.length > 0) {
              self.add_circle(r.point, self.circle_arr.length, self.circle_arr, self, map)
            }
          }
        })

      });
    } else {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          this.shopService.trans_location_ios(resp.coords.latitude, resp.coords.longitude).then(res => {
            var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
            map.centerAndZoom(locationPoint, this.zoom_size);
            var circle = new BMap.Circle(locationPoint, self.meters, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
            this.shopService.get_total_shop_gps_new({'lng': res.result[0].x,'lat': res.result[0].y, 'distance': self.meters}).then(res => {
              if (res.result.res_data && res.result.res_code == 1) {
                for (let i = 0; i < res.result.res_data.length; i++) {
                  if (res.result.res_data[i].rt_partner_shop_x == 0 && res.result.res_data[i].rt_partner_shop_y == 0) {
                    var myGeo = new BMap.Geocoder()
                    myGeo.getPoint(res.result.res_data[i].detailed_address, function (point) {
                      if (point) {
                        var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                        if (result) {
                          res.result.res_data[i]['rt_partner_shop_x'] = point.lng
                          res.result.res_data[i]['rt_partner_shop_y'] = point.lat
                          var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                          label.setStyle({
                            color: "white", //字体颜色
                            fontSize: "16px",//字体大小 
                            backgroundColor: "#2597ec", //文本标注背景颜色　
                            border: "0",
                            fontWeight: "bold", //字体加粗
                            padding: "7px",
                            borderRadius: "20px",
                          });
                          label.addEventListener("click", function () {
                            if (self.is_need_back) {
                              self.frontPage.data.need_update_shop = true
                              self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                              self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                              self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                              self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                              self.navCtrl.popTo(self.frontPage)
                            }
                            else {
                              let modal = self.modalController.create("ModalLocationPage", {
                                'data_item': res.result.res_data[i],
                                'user_id': self.user_id,
                              })
                              modal.present()
                            }
                          })
                          self.circle_arr.push(label)
                          // map.addOverlay(label);
                        }
                      }
                    });
                  }
                  else {
                    var point = new BMap.Point(res.result.res_data[i].rt_partner_shop_x, res.result.res_data[i].rt_partner_shop_y);
                    var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
                    console.log(result)
                    if (result) {
                      var label = new BMap.Label(res.result.res_data[i].name, { position: point })
                      label.setStyle({
                        color: "white", //字体颜色
                        fontSize: "16px",//字体大小 
                        backgroundColor: "#2597ec", //文本标注背景颜色　
                        border: "0",
                        fontWeight: "bold", //字体加粗
                        padding: "7px",
                        borderRadius: "20px",
                      });
                      label.addEventListener("click", function () {
                        if (self.is_need_back) {
                          self.frontPage.data.need_update_shop = true
                          self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
                          self.frontPage.data.visit_shop_name = res.result.res_data[i].name
                          self.frontPage.data.partner_id = res.result.res_data[i].rt_partner_top_id_id
                          self.frontPage.data.partner_name = res.result.res_data[i].rt_partner_top_id
                          self.navCtrl.popTo(self.frontPage)
                        }
                        else {
                          let modal = self.modalController.create("ModalLocationPage", {
                            'data_item': res.result.res_data[i],
                            'user_id': self.user_id,
                          })
                          modal.present()
                        }
                      })
                      self.circle_arr.push(label)
                      // map.addOverlay(label);
                    }
                  }

                }
                if (self.circle_arr.length > 0) {
                  self.add_circle(locationPoint, self.circle_arr.length, self.circle_arr, self, map)
                }
              }
            })
          })
        }).catch((error) => {
          console.log('Error getting location', error);
        })

    }
  }

  get_total_shop_gps() {
    this.shopService.get_total_shop_gps({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {

      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  add_circle(center, count, circle_data_arr, self, map) {
    self.now_center = center
    map.clearOverlays()
    var label = new BMap.Label(count + '家', { position: center })
    label.setStyle({
      color: "white", //字体颜色
      fontSize: "16px",//字体大小 
      backgroundColor: "#2597ec", //文本标注背景颜色　
      border: "0",
      fontWeight: "bold", //字体加粗
      padding: "7px",
      borderRadius: "30px",
      width: '60px',
      height: '60px',
      lineHeight: '45px',
      textAlign: 'center',
      zIndex: 999,
    });
    label.setOffset(new BMap.Size(-60, -60))
    label.addEventListener("click", function () {
      map.clearOverlays()
      for (var i = 0; i < circle_data_arr.length; i++) {
        map.addOverlay(circle_data_arr[i])
      }
    })
    map.addOverlay(label)
  }

  // add_oval(centre,x,y)
  // {
  // 	var assemble=new Array();
  // 	var angle;
  // 	var dot;
  // 	var tangent=x/y;
  // 	for(var i=0;i<36;i++)
  // 	{
  // 		angle = (2* Math.PI / 36) * i;
  // 		dot = new BMap.Point(centre.lng+Math.sin(angle)*y*tangent, centre.lat+Math.cos(angle)*y);
  // 		assemble.push(dot);
  // 	}
  // 	return assemble;
  // }

}
