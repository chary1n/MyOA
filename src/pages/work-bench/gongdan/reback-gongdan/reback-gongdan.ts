import { HttpService } from './../../../../providers/HttpService';
import { NativeService } from './../../../../providers/NativeService';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { GongDanService } from '../gongdanService';
import { Utils } from '../../../../providers/Utils';
import { AlertController} from 'ionic-angular';
/**
 * Generated class for the RebackGongdanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reback-gongdan',
  templateUrl: 'reback-gongdan.html',
  providers: [GongDanService, NativeService]
})
export class RebackGongdanPage {
  title;
  description;
  priorityId;
  companyIschoosed = true;
  chooseList;
  // 指派受理人
  assignList;
  imgList = [];
  pushImgList = [];
  choosePeopleItem;
  choosePeopleName;
  whoCanSee = "全公司";
  chooseDepartmentName;
  CreateGongdanPage;
  departmentList;
  reback_item;
  is_back_gongdan;
  frontPage;
  work_order_id;
  priority = [{ name: '低', id: '1' }, { name: '中', id: '2' }, { name: '高', id: '3' }]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public gongdanService: GongDanService,
    public actionSheetCtrl: ActionSheetController,
    public nativeService: NativeService,
    public alertCtrl:AlertController) {
    this.navParams.data.companyIschoosed = true;
    this.frontPage = Utils.getViewController("GongdanDetailPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RebackGongdanPage');
  }

  ionViewWillEnter() {
    let reback_item = this.navParams.get('reback_item')
    let need_reback = this.navParams.get('need_reback')
    if (need_reback){
      this.is_back_gongdan = true;
      this.navParams.data.need_reback = false
      this.title = reback_item.title
      this.description = reback_item.description
      this.imgList = reback_item.work_order_images
      this.priorityId = reback_item.priority
      this.work_order_id = reback_item.work_order_id
    }
    else
    {
      this.is_back_gongdan = false;
      this.companyIschoosed = this.navParams.get('companyIschoosed')
      this.chooseList = this.navParams.get('chooseList')
      this.choosePeopleItem = this.navParams.get('choosePeopleItem')
      this.chooseDepartmentName = this.navParams.get('chooseDepartmentName')
      this.departmentList = this.navParams.get("departmentList")
      console.log(this.choosePeopleItem)
      if (this.choosePeopleItem) {
        this.choosePeopleName = this.choosePeopleItem.name
      }
      if (this.companyIschoosed) {
        this.whoCanSee = "全公司"
      } else {
       this.whoCanSee = this.chooseDepartmentName
     }
    }
    

    console.log(this.companyIschoosed)
    console.log(this.chooseList)
  }

  release() {
    let mString = "";
    if (!this.title) {
      mString = mString + "   请输入标题"
    }
    if (!this.description) {
      mString = mString + "   请输入问题描述"
    }
    if (!this.priorityId) {
      mString = mString + "   请选择优先级"
    }
    if (!(this.companyIschoosed || this.chooseList)) {
      mString = mString + "   请选择谁可以看"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      let departments;
      if (!this.companyIschoosed) {
        departments = this.chooseList
      }
      let assign_uid
      if (this.choosePeopleItem) {
        assign_uid = this.choosePeopleItem.id
      }
      let body = {
        title: this.title,
        description: this.description,
        priority: this.priorityId,
        assign_uid: assign_uid,
        departments: departments,
        uid: HttpService.user_id,
        wo_images: this.pushImgList,
        work_order_id:this.work_order_id,
      }
      this.gongdanService.commit_draft(body).then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
         
             this.frontPage.data.need_fresh = true;
             this.navCtrl.popTo(this.frontPage);
        
         
        }
      })
    }
  }

  chooseWhoCanSee() {
    this.navCtrl.push('WhoCanSeePage', { companyIschoosed: this.companyIschoosed ,departmentList:this.departmentList,need_pop_reback:true,})
    // this.create_work_order()
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
      targetWidth: 256,
      targetHeight: 256
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
    // this.isChange = true;
    // this.user_heard = img_url;
    // this.editInformationService.pushHeardImage(img_url.split(",")[1])
    //   .then(res => {
    //     if (res.result && res.result.res_code == 1) {
    //       this.storage.get('user').then(userBean => {
    //         userBean.result.res_data.user_ava = res.result.res_data.user_ava
    //         this.storage.set('user', userBean)
    //       })
    //     }
    //   })
  }


  assignPeople() {
    this.navCtrl.push("AssignPeoplePage",{
      need_pop_reback:true,
    })
  }

  goBack(){
    if (this.title || this.description ||this.priorityId) {
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
    }
  }
    
  

}
