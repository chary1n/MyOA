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

  zoom_size = 11
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public shopService: ShopService, public geolocation: Geolocation, public modalController: ModalController) {
    this.is_need_back = this.navParams.get('is_need_back')
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
    if (this.platform.is("android")) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        console.log(r.point.lat)
        map.centerAndZoom(r.point, self.zoom_size);
        var circle = new BMap.Circle(r.point, 50000, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
        self.shopService.get_total_shop_gps({}).then(res => {
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
                          self.navCtrl.popTo(self.frontPage)
                        }
                        else {
                          let modal = self.modalController.create("ModalLocationPage", {
                            'data_item': res.result.res_data[i]
                          })
                          modal.present()
                        }
                      })
                      map.addOverlay(label);
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
                      self.navCtrl.popTo(self.frontPage)
                    }
                    else {
                      let modal = self.modalController.create("ModalLocationPage", {
                        'data_item': res.result.res_data[i]
                      })
                      modal.present()
                    }
                  })
                  map.addOverlay(label);
                }
              }

            }
          }
        })

      });




      // GaoDe.getCurrentPosition((success) => {
      //   var that = this
      //   console.log(success.latitude + " 12312312");
      //   this.shopService.trans_location(success.latitude, success.longitude).then(res => {
      //     var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
      //     map.centerAndZoom(locationPoint, 13);
      //     var circle = new BMap.Circle(locationPoint, 5000, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
      //     this.shopService.get_total_shop_gps({}).then(res => {
      //       if (res.result.res_data && res.result.res_code == 1) {
      //         for (let i = 0; i < res.result.res_data.length; i++) {
      //           if (res.result.res_data[i].rt_partner_shop_x == 0 && res.result.res_data[i].rt_partner_shop_y == 0) {
      //             var myGeo = new BMap.Geocoder()
      //             myGeo.getPoint(res.result.res_data[i].detailed_address, function (point) {
      //               if (point) {
      //                 var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
      //                 if (result) {
      //                   res.result.res_data[i]['rt_partner_shop_x'] = point.lng
      //                   res.result.res_data[i]['rt_partner_shop_y'] = point.lat
      //                   var label = new BMap.Label(res.result.res_data[i].name, { position: point })
      //                   label.setStyle({
      //                     color: "white", //字体颜色
      //                     fontSize: "16px",//字体大小 
      //                     backgroundColor: "#2597ec", //文本标注背景颜色　
      //                     border: "0",
      //                     fontWeight: "bold", //字体加粗
      //                     padding: "7px",
      //                     borderRadius: "20px",
      //                   });
      //                   label.addEventListener("click", function () {

      //                     if (self.is_need_back) {
      //                       self.frontPage.data.need_update_shop = true
      //                       self.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
      //                       self.frontPage.data.visit_shop_name = res.result.res_data[i].name
      //                       self.navCtrl.popTo(self.frontPage)
      //                     }
      //                     else {
      //                       let modal = self.modalController.create("ModalLocationPage", {
      //                         'data_item': res.result.res_data[i]
      //                       })
      //                       modal.present()
      //                     }
      //                   })
      //                   map.addOverlay(label);
      //                 }
      //               }
      //             });
      //           }
      //           else {
      //             var point = new BMap.Point(res.result.res_data[i].rt_partner_shop_x, res.result.res_data[i].rt_partner_shop_y);
      //             var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
      //             console.log(result)
      //             if (result) {
      //               var label = new BMap.Label(res.result.res_data[i].name, { position: point })
      //               label.setStyle({
      //                 color: "white", //字体颜色
      //                 fontSize: "16px",//字体大小 
      //                 backgroundColor: "#2597ec", //文本标注背景颜色　
      //                 border: "0",
      //                 fontWeight: "bold", //字体加粗
      //                 padding: "7px",
      //                 borderRadius: "20px",
      //               });
      //               label.addEventListener("click", function () {

      //                 if (that.is_need_back) {
      //                   that.frontPage.data.need_update_shop = true
      //                   that.frontPage.data.visit_shop_id = res.result.res_data[i].shop_id
      //                   that.frontPage.data.visit_shop_name = res.result.res_data[i].name
      //                   that.navCtrl.popTo(that.frontPage)
      //                 }
      //                 else {
      //                   let modal = that.modalController.create("ModalLocationPage", {
      //                     'data_item': res.result.res_data[i]
      //                   })
      //                   modal.present()
      //                 }
      //               })
      //               map.addOverlay(label);
      //             }
      //           }

      //         }
      //       }
      //     })

      //   })
      // }, (error) => {
      //   console.log('Error getting location', error);
      // });
    } else {
      // this.shopService.get_total_shop_gps({}).then(res => {
      //   if (res.result.res_data && res.result.res_code == 1) {
      //     for (let i = 0; i < res.result.res_data.length; i++) {
      //       var point = new BMap.Point(res.result.res_data[i].rt_partner_shop_x, res.result.res_data[i].rt_partner_shop_y);
      //       map.centerAndZoom(point, 13);
      //       var circle = new BMap.Circle(point, 5000, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
      //       var result = BMapLib.GeoUtils.isPointInCircle(point, circle);
      //       if (result) {
      //         var label = new BMap.Label(res.result.res_data[i].name, { position: point })
      //         label.setStyle({
      //           color: "white", //字体颜色
      //           fontSize: "16px",//字体大小 
      //           backgroundColor: "#2597ec", //文本标注背景颜色　
      //           border: "0",
      //           fontWeight: "bold", //字体加粗
      //           padding: "7px",
      //           borderRadius: "20px",
      //         });
      //         label.addEventListener("click", function () {
      //           let modal = self.modalController.create("ModalLocationPage", {
      //             'data_item': res.result.res_data[i]
      //           })
      //           modal.present()
      //         })
      //         map.addOverlay(label);
      //       }
      //     }
      //   }
      // })


      this.geolocation.getCurrentPosition()
        .then((resp) => {

          this.shopService.trans_location_ios(resp.coords.latitude, resp.coords.longitude).then(res => {
            var locationPoint = new BMap.Point(res.result[0].x, res.result[0].y);
            map.centerAndZoom(locationPoint, this.zoom_size);
            var circle = new BMap.Circle(locationPoint, 50000, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 })
            this.shopService.get_total_shop_gps({}).then(res => {
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
                              self.navCtrl.popTo(self.frontPage)
                            }
                            else {
                              let modal = self.modalController.create("ModalLocationPage", {
                                'data_item': res.result.res_data[i]
                              })
                              modal.present()
                            }
                          })
                          map.addOverlay(label);
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
                          self.navCtrl.popTo(self.frontPage)
                        }
                        else {
                          let modal = self.modalController.create("ModalLocationPage", {
                            'data_item': res.result.res_data[i]
                          })
                          modal.present()
                        }
                      })
                      map.addOverlay(label);
                    }
                  }

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

}
