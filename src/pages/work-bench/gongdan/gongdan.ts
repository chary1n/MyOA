import { HttpService } from './../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './gongdanService';
/**
 * Generated class for the GongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan',
  templateUrl: 'gongdan.html',
  providers: [GongDanService]
})
export class GongdanPage {
  canvas: any;
  ctx: any;
  boHeight: any;
  posHeight: any;
  step: any;
  lines: any;
  show_type;
  processNumber;
  unassignNumber;
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusbar: StatusBar,
    public gongdanService: GongDanService) {
    this.show_type = "tongji";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanPage');
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
    this.drawRings();
    // this.step = 1;
    // this.loop();
    // window.setInterval(() => {
    //   this.loop();
    // }, 500);
  }

  click_me() {
    this.show_type = "me"
    this.gongdanService.my_work_order_statistics().then(res => {
      if (res.result && res.result.res_code == 1) {
        this.processNumber = res.result.res_data.process
        this.unassignNumber = res.result.res_data.unassignNumber
      }
      console.log(res)
    })
  }

  click_gongdan() {
    this.show_type = "gongdan"
  }

  click_tongji() {
    this.show_type = "tongji"
    this.gongdanService.work_order_statistics().then(res => {
      console.log(res)
    })
  }

  wait_shouli() {

  }

  shouli() {

  }

  wait_yanshou() {

  }


  loop() {
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 200;
    var boHeight = canvas.height / 10;
    var posHeight = canvas.height / 1.2;
    var lines = ["rgba(0,222,255, 0.2)"];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.step == 80) {
      this.step = 0;
    }
    this.step = this.step + 20;

    for (var j = lines.length - 1; j >= 0; j--) {
      ctx.fillStyle = lines[j];
      var angle = (this.step + j * 50) * Math.PI / 180;
      var deltaHeight = Math.sin(angle) * boHeight;
      var deltaHeightRight = Math.cos(angle) * boHeight;
      ctx.beginPath();
      ctx.moveTo(0, posHeight + deltaHeight);
      ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(0, posHeight + deltaHeight);
      ctx.closePath();
      ctx.fill();
    }
  }
  goBack() {
    this.statusbar.backgroundColorByHexString("#ffffff");
    this.statusbar.styleDefault();
    this.navCtrl.pop();
  }

  click_detail() {
    this.navCtrl.push('GongdanDetailPage')
  }



  // 我的工单  xd
  mySubmitList() {
    this.navCtrl.push("MyGongdanListPage")
  }

  createGongdan() {
    this.navCtrl.push("CreateGongdanPage")
  }

  drawRings() {
    var data = [0.2, 0.4, 0.1, 0.3];//五个扇形的占比

    var dataColor = ["#0097ee", '#ffa634', '#ffe650', '#c1e372'];//五个扇形的颜色

    var angleStart = 0, angleEnd, angle;

    var Q3Canvas =  <HTMLCanvasElement>document.getElementById('rings');

    Q3Canvas.width = 100;
    Q3Canvas.height = 100

    var ctx = Q3Canvas.getContext("2d");

    for (var i = 0; i < data.length; i++) {

      angle = 2 * Math.PI * data[i];

      angleEnd = angleStart + angle;

      ctx.beginPath();

      ctx.fillStyle = dataColor[i];

      ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 2, angleStart, angleEnd);

      ctx.lineTo(Q3Canvas.width / 2, Q3Canvas.height / 2);

      ctx.closePath();

      ctx.fill();

      angleStart = angleEnd;//设置画下一个扇形的起点位置

    };
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 4, 0, 360);
    ctx.closePath();
    ctx.fill();



  }




}
