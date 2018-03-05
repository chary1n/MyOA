import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeService } from './../../../../providers/NativeService';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Utils } from '../../../../providers/Utils';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import {WriteJournalService } from './../writejournalService';
import { Storage } from '@ionic/storage';
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the WriteJournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-write-journal',
  templateUrl: 'write-journal.html',
  providers: [WriteJournalService],
})
export class WriteJournalPage {
  user_id;
  name;//销售员
  month;//拜访日期
  timeStarts = '12:00';//开始时间
  timeEnds = '12:00';//结束时间
  companyName;//客户名称
  companyAddress;//客户地址
  companyFrom;//客户渠道
  saleTeam;//销售团队
  visitArm = '请选择';//拜访目的
  contentChat;//客户沟通内容
  sumChat;//总结
  visitObject;//拜访对象
  visitPhone;//客户电话
  visitLink;//QQ/Email
  visitState;//客户状态
  frontPage;
  isFirst = true;
  isSecond = false;
  deletePicture ;
  imgList = [];
  pushImgList = [];
  isDeletePicture = false;
  stateOperate = '下一步';
  title = '填客户资料';
  timeOne;//开始时间的时间戳
  timeTwo;//结束时间的时间戳
  team_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public statusBar:StatusBar,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public writeService: WriteJournalService,
    public storage: Storage,
    public alertCtrl:AlertController,
    public platform: Platform,
    public nativeService: NativeService) 
    {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.frontPage = Utils.getViewController("JournalSheetPage", navCtrl)
    this.storage.get('user')
    .then(res => {
      this.name = res.result.res_data.name;
      this.user_id = res.result.res_data.user_id;
      if(res.result.res_data.team){
        this.saleTeam = res.result.res_data.team.team_name;
        this.team_id = res.result.res_data.team.team_id
      }
      console.log("saleTeam= "+this.saleTeam)
    });
    this.month = Utils.dateFormat(new Date(), 'yyyy-MM-dd');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteJournalPage');
  }

  ionViewWillEnter() {
    this.isDeletePicture =this.navParams.get('isDeletePicture')
   console.log(this.isDeletePicture)
   if(this.isDeletePicture){
    this.navParams.data.isDeletePicture= false ;
    this.imgList.splice(this.imgList.indexOf(this.deletePicture),1) 
    this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]),1) 
   }
  }
  
  goBack(){
    if(this.isSecond){
        this.stateOperate = '下一步'
        this.isFirst = true
        this.isSecond =false
        this.title = '填客户资料'
    }else{
      if (this.companyName || this.companyAddress || this.companyFrom ||
       this.visitPhone || this.visitLink || this.visitState || this.visitObject) {
        this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }else{
      this.statusBar.backgroundColorByHexString("#f8f8f8");
      this.statusBar.styleDefault();
      this.navCtrl.pop();
    }
    }
  }

  selectArm(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '拜访目的',
      buttons: [
        {
          text: '初次拜访',
          handler: () => {
            this.visitArm = "初次拜访"
          }
        },
        {
          text: '维护客户',
          handler: () => {
            this.visitArm = "维护客户"
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  clickPicture(item){
    this.deletePicture = item;
    console.log("this.deletePicture = "+this.deletePicture)
    this.navCtrl.push("NewDeletePage" ,{item:item,need_back_write:true})
  }

  addImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
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

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  private getPictureSuccess(img_url) {
    console.log(img_url)
    this.imgList.push(img_url)
    this.pushImgList.push(img_url.split(",")[1])
  }


  commite(){
    if(this.isFirst){
      let myString = ""
      if(!this.saleTeam){
        myString = "   请选择销售团队"
      }
      if(!this.companyName){
        myString = "   请输入客户名称"
      }
      if(!this.companyAddress){
        myString = "   请输入客户地址"
      }
      if(!this.companyFrom){
        myString = "   请输入客户渠道"
      }
      if(!this.timeStarts){
        myString = "   请选择开始时间"
      }
      if(!this.timeEnds){
        myString = "   请选择结束时间"
      }
      if(!this.visitObject){
        myString = "   请输入拜访对象"
      }
      if(!this.visitPhone){
        myString = "   请输入客户电话"
      }
      if(!this.visitLink){
        myString = "   请输入QQ/Email"
      }
      if(!this.visitState){
        myString = "   请输入客户状态"
      }
      if(!this.visitArm || this.visitArm=='请选择'){
        myString = "   请选择拜访目的"
      }
      if(this.timeStarts && this.timeEnds){
        this.timeOne = Utils.dateFormat(new Date(this.month+" "+this.timeStarts), 'yyyy-MM-dd HH:mm:ss')
        this.timeTwo = Utils.dateFormat(new Date(this.month+" "+this.timeEnds), 'yyyy-MM-dd HH:mm:ss')  
        if(new Date(this.timeOne).getTime()>=new Date(this.timeTwo).getTime()){
          Utils.toastButtom('开始时间不能比结束时间晚！', this.toastCtrl)
          return
        }
      }
      if(myString != ""){
        Utils.toastButtom(myString, this.toastCtrl)
      }else{
        this.stateOperate = '提交'
        this.isFirst = false
        this.isSecond =true
        this.title = '总结'
      }
    }else if(this.isSecond){
      let myString = ""
      if(!this.contentChat){
        myString = myString+"   请输入沟通内容"
      }
      if(!this.sumChat){
        myString = myString+"   请输入总结"
      }
      if(myString != ""){
        Utils.toastButtom(myString, this.toastCtrl)
      }else{
        let body = {
          uid: this.user_id,
          name: this.name,
          team: this.saleTeam,
          team_id: this.team_id,
          partner_name: this.companyName,
          partner_address: this.companyAddress,
          partner_channel: this.companyFrom,
          visit_date_begin: this.timeOne,
          visit_date_end: this.timeTwo,
          visit_name: this.visitObject,
          partner_phone: this.visitPhone,
          partner_contact_way: this.visitLink,
          partner_state: this.visitState,
          visit_target: this.visitArm,
          content_description: this.contentChat,
          summary: this.sumChat,
          imageList: this.pushImgList
        }
        this.writeService.create_visit_journal(body).then(res =>{
          res.res_data;
          if(res.result.res_code==1 && res.result){
            console.log(res)
            this.navCtrl.popTo(this.frontPage);
          }
         }
        )
      }
    }
  }

  selectTeam(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '销售团队',
      buttons: [
        {
          text: '跨境电商',
          handler: () => {
            this.saleTeam = "跨境电商"
          }
        },
        {
          text: '国内市场',
          handler: () => {
            this.saleTeam = "国内市场"
          }
        },
        {
          text: '国内线上电商',
          handler: () => {
            this.saleTeam = "国内线上电商"
          }
        },
        {
          text: '国内线下销售',
          handler: () => {
            this.saleTeam = "国内线下销售"
          }
        },
        {
          text: '国外OEM业务部',
          handler: () => {
            this.saleTeam = "国外OEM业务部"
          }
        },
        {
          text: '国外品牌业务部',
          handler: () => {
            this.saleTeam = "国外品牌业务部"
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
