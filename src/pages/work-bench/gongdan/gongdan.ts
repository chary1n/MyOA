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
  unacceptTitle = "等待受理";
  unassignTitle = "待验收";
  processTitle = "受理中";
  dataList = [];
  doneTongji = 0;
  checkTongji = 0;
  unacceptTongji = 0;
  processTongji = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusbar: StatusBar,
    public gongdanService: GongDanService) {
    this.show_type = "me";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanPage');
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
    // this.step = 1;
    // this.loop();
    // window.setInterval(() => {
    //   this.loop();
    // }, 500);
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.gongdanService.work_order_statistics().then(res => {
        console.log(res)
      if(res.result.res_data)
      {
        if(res.result.res_data.unaccept){
          this.unacceptTitle ="等待受理" +" (" + res.result.res_data.unaccept + ")";
        }
        if(res.result.res_data.check){
          this.unassignTitle = "待验收" + " (" + res.result.res_data.check + ")";
        }
        if(res.result.res_data.process){
          this.processTitle = "受理中" + " (" + res.result.res_data.process + ")";
        }
      }
    })
    this.getDataList("process")
    }
  }

  click_me() {
    this.show_type = "me"
    this.looper();
    this.gongdanService.my_work_order_statistics().then(res => {
      if (res.result && res.result.res_code == 1) {
        this.processNumber = res.result.res_data.process
        this.unassignNumber = res.result.res_data.unassignNumber
      }
      console.log(res)
    })
  }

  click_gongdan() {
    this.dataList = []
    this.show_type = "gongdan"
    this.gongdanService.work_order_statistics().then(res => {
      console.log(res)
      if(res.result.res_data)
      {
        if(res.result.res_data.unaccept){
          this.unacceptTitle ="等待受理" +" (" + res.result.res_data.unaccept + ")";
        }
        if(res.result.res_data.check){
          this.unassignTitle = "待验收" + " (" + res.result.res_data.check + ")";
        }
        if(res.result.res_data.process){
          this.processTitle = "受理中" + " (" + res.result.res_data.process + ")";
        }
      }
    })
    this.getDataList("unaccept")
  }

  click_tongji() {
    this.show_type = "tongji"
    this.gongdanService.work_order_statistics().then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1) {
        this.processTongji = res.result.res_data.process ? parseInt(res.result.res_data.process) : 0
        this.unacceptTongji = res.result.res_data.unaccept ? parseInt(res.result.res_data.unaccept) : 0
        this.checkTongji = res.result.res_data.check ? parseInt(res.result.res_data.check) : 0
        this.doneTongji = res.result.res_data.done ? parseInt(res.result.res_data.done) : 0
        let total = this.processTongji + this.checkTongji + this.doneTongji + this.unacceptTongji
        if (total == 0) {
          this.drawRings(0, 0, 0, 1)
        } else {
          this.drawRings(this.processTongji / total, this.unacceptTongji / total, this.checkTongji / total, this.doneTongji / total)
        }
      }
    })
  }

  wait_shouli() {

  }

  shouli() {

  }

  wait_yanshou() {

  }


  looper() {
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 100;
    //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
    function requestAnimFrame(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
    // 波浪大小
    var boHeight = canvas.height / 10;
    var posHeight = canvas.height / 1.2;
    //初始角度为0  
    var step = 0;
    //定义三条不同波浪的颜色  
    var lines = [
      "rgba(0,255,255, 0.2)",
      "rgba(200,236,253, 0.2)"];
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;
      //画3个不同颜色的矩形  
      for (var j = lines.length - 1; j >= 0; j--) {
        ctx.fillStyle = lines[j];
        //每个矩形的角度都不同，每个之间相差45度  
        var angle = (step + j * 50) * Math.PI / 180;
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
      requestAnimFrame(loop);
    }
    loop();
  }
  goBack() {
    this.statusbar.backgroundColorByHexString("#ffffff");
    this.statusbar.styleDefault();
    this.navCtrl.pop();
  }

  click_detail() {
    this.navCtrl.push('GongdanDetailPage')
  }



  // 我提交的工单  xd
  mySubmitList() {
    let body = JSON.stringify({
      uid:HttpService.user_id,
      create_uid :HttpService.user_id
    });
    this.requestWorkOrderSearch(body)
  }

  // 我受理中的
  myProcessList(){
    let body = JSON.stringify({
      uid:HttpService.user_id,
      assign_uid :HttpService.user_id
    });
    this.requestWorkOrderSearch(body)
  }


  waitOrderAssign(){
    
  }





  requestWorkOrderSearch(body){
    this.gongdanService.work_order_search(body).then(res=>{
      if(res.result&&res.result.res_code==1){
        this.navCtrl.push("MyGongdanListPage",{gongdanList : res.result.res_data})
      }
    })
  }




  createGongdan() {
    this.navCtrl.push("CreateGongdanPage")
  }

  drawRings(a, b, c, d) {
    var data = [a, b, c, d];//五个扇形的占比

    var dataColor = ["#1897f2", '#faa619', '#fce63a', '#c3e369'];//五个扇形的颜色

    var angleStart = 0, angleEnd, angle;

    var Q3Canvas = <HTMLCanvasElement>document.getElementById('rings');

    Q3Canvas.width = 100;
    Q3Canvas.height = 100 ;

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

  changeState(item){
    let state_str="";
    if (item == "unaccept"){
      state_str = "等待受理"
    }
    else if (item == "process"){
      state_str = "受理中"
    }
    else if (item == "check"){
      state_str = "待验收"
    }
    return state_str
  }

  unacceptClick(){
    this.getDataList("unaccept")
  }

  processClick(){
    this.getDataList("process")
  }

  unassignClick(){
    this.getDataList("check")   
  }

  getDataList(state){
    this.dataList = [];
    this.gongdanService.work_order_search(JSON.stringify({
        uid:HttpService.user_id,
        issue_state:state,
      })).then(res => {
        console.log(res)
        if (res.result.res_data){
          for (let item of res.result.res_data) {
             this.dataList.push(item)
          }
        }
    })
  }

  gongdanDetail(item){
    this.gongdanService.getGongdanDetail(item.work_order_id).then(res => {
      console.log(res)
      if(res.result.res_data && res.result.res_code == 1){
        this.navCtrl.push('GongdanDetailPage',{
          items:res.result.res_data,
        })
      }
    })
  }
}
