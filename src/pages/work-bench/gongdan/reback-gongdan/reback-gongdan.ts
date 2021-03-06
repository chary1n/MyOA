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
import { StatusBar } from '@ionic-native/status-bar';
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
  biaoqianList;
  priority = [{ name: '低', id: '1' }, { name: '中', id: '2' }, { name: '高', id: '3' }]
  brand_list = [];
  area_list = [];
  category_list = [];
  all_tag_list = []
  isDeletePicture = false;
  deletePicture ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public gongdanService: GongDanService,
    public actionSheetCtrl: ActionSheetController,
    public nativeService: NativeService,
    public alertCtrl:AlertController,
    public statusbar :StatusBar) {
    this.navParams.data.companyIschoosed = true;
    this.frontPage = Utils.getViewController("GongdanDetailPage", navCtrl)

    this.gongdanService.get_all_biaoqian().then(res=>{
      console.log(res)
      if(res.result&&res.result.res_code==1){
        this.biaoqianList = res.result.res_data.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RebackGongdanPage');
  }

  ionViewWillEnter() {
     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
 
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
       this.whoCanSee = "指定部门"
     }
    }

     
   this.isDeletePicture =this.navParams.get('isDeletePicture')
   console.log(this.isDeletePicture)
   if(this.isDeletePicture){
     this.isDeletePicture = false ;
     this.imgList.splice(this.imgList.indexOf(this.deletePicture),1) 
    
    this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]),1) 
 
   }
    
    if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)){
      this.brand_list = this.navParams.get('brand_list')
      this.navParams.data.brand_list = false;
    }
    if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)){
      this.area_list = this.navParams.get('area_list')
      this.navParams.data.area_list = false;
    }
    if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)){
      this.category_list = this.navParams.get('category_list')
      this.navParams.data.category_list = false;
    }
    if (this.navParams.get('all_tag_list') && (this.navParams.get('all_tag_list').length || this.navParams.get('all_tag_list').length == 0)){
      this.all_tag_list = this.navParams.get('all_tag_list')
      this.navParams.data.all_tag_list = false;
    }
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
    let tags = [] ;
      if(this.biaoqianList){
        for (let i = 0 ;i<this.biaoqianList.length;i++){
          if(this.biaoqianList[i].ischeck){
            tags.push(this.biaoqianList[i].id)
          }
        }
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
        brand_ids:this.brand_list,
        area_ids:this.area_list,
        category_ids:this.category_list,
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

  clickbiaoqian(item){
    item.ischeck = !item.ischeck
  }

  isChoose(item){
    return item.ischeck
  }
    
  chooseBiaoqian(){
    this.gongdanService.get_all_biaoqian().then(res=>{
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('BiaoqianPage',{list:res.result.res_data,
        area_ids:this.area_list,
      brand_ids:this.brand_list,
    category_ids:this.category_list,
  need_pop_reback:true})
      }
    })
  }

  all_tags(){
    let all_tags=""
    for (let items of this.all_tag_list) {
      all_tags += items.name + " " 
    }
    return all_tags
  }
  
  clickPicture(item){
    this.deletePicture = item ;
    this.navCtrl.push("DeletePicturePage" ,{item:item,need_back_retry:true})
  }
}
