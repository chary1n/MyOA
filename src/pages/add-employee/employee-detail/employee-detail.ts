import { EditInformationService } from './../../me/edit-information/editInformationService';
import { Utils } from './../../../providers/Utils';
import { NativeService } from './../../../providers/NativeService';
import { EmployeeService } from './../EmployeeService';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { WebIntent } from '@ionic-native/web-intent';
import { AppAvailability } from '@ionic-native/app-availability';
import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
declare let startApp: any;

/**
 * Generated class for the EmployeeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
  providers: [EmployeeService, CallNumber, AppAvailability,EditInformationService],
})
export class EmployeeDetailPage {
  show_type = "one"
  item: any;
  sexList = [{ name: '男', id: 'male' }, { name: '女', id: 'female' }]
  marriageList = [{ name: '未婚', id: 'single' }, { name: '已婚', id: 'married' }, { name: '离异', id: 'divorced' }, { name: '丧偶', id: 'widower' }]
  minzuList;
  departmentList;
  isModify = false;
  isDeletePicture = false;
  deletePicture;
  photoType;
  origin_data;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber,
    public alertCtrl: AlertController,
    public toast: ToastController,
    private appAvailability: AppAvailability,
    public platform: Platform,
    private editInformationService: EditInformationService,
    public actionSheetCtrl: ActionSheetController,
    private nativeService: NativeService,
    public employeeService: EmployeeService,
    public toastCtrl: ToastController,
  ) {
    this.employeeService.get_employee_list().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.minzuList = res.result.res_data
      }
    })
    this.employeeService.getDepartmentNoLoading().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.departmentList = res.result.res_data.all_departments.res_data
      }
    })

    this.isModify = this.navParams.get("isModify")
    this.item = '';
    this.item = this.navParams.get("item")
    this.origin_data = this.navParams.get("origin_data")
    console.log(this.item)
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailPage');
  }



  ionViewWillEnter() {
    this.isDeletePicture = this.navParams.get('isDeletePicture')
    if (this.isDeletePicture) {
      this.navParams.data.isDeletePicture = false;
      if (this.photoType == "photoPositive") {
        this.item.identification_A = ""
      } else if (this.photoType == "photoNeagtive") {
        this.item.identification_B = ""
      } else if (this.photoType == "photoBank") {
        this.item.bank_card = ""
      } else if (this.photoType == "photoZhengshu") {
        this.item.certificate_image_ids.splice(this.item.certificate_image_ids.indexOf(this.deletePicture), 1)
      }
    }
  }



  click_one() {
    this.show_type = "one";
  }

  click_two() {
    this.show_type = "two";
  }
  click_three() {
    this.show_type = "three";
  }


  callPhone() {
    //  alert(this.items.phone);
    if (this.item.mobile_phone != 'false' && this.item.mobile_phone != '') {
      let confirm = this.alertCtrl.create({
        title: this.item.mobile_phone,
        buttons: [
          {
            text: '取消',
            handler: () => {
            }
          },
          {
            text: '确定',
            handler: () => {
              this.call(this.item.mobile_phone);
            }
          }]
      }).present();
    }
    else {
      Utils.toastButtom("该员工未填写手机号", this.toast)
    }
  }


  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  sendEmail() {
    this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail')
  }

  openAppWith(ios_bundle_id, android_bundle_id) {
    let app;

    if (this.platform.is('ios')) {
      app = ios_bundle_id;
    }
    else if (this.platform.is('android')) {
      let sApp = startApp.set({
        "component": ["com.alibaba.cloudmail", "com.alibaba.alimei.activity.Welcome"]
      });
      sApp.start(function () { /* success */
        console.log("OK");
      }, function (error) { /* fail */
        alert("请先下载阿里邮箱");
      });
      return;
    }
    let ctrl = this.alertCtrl;

    this.appAvailability.check(app).then(

      function () { // success callback

        let browser = new InAppBrowser();
        browser.create(app, '_system', 'location=yes');
        // window.open('camcard://','_system',  'location=yes');
      },
      function () {
        console.log('1');
        ctrl.create({
          title: '提示',
          subTitle: "请先下载阿里邮箱",
          buttons: [
            {
              text: '取消',
              handler: () => {

              }
            }, {
              text: '跳转下载',
              handler: () => {
                let browser = new InAppBrowser();
                browser.create('https://itunes.apple.com/cn/app/a-li-you-xiang/id923828102?mt=8');
              }
            }
          ]
        }).present();
      }
    );
  }

  edit() {
    this.isModify = true
  }


  release() {
    let mString = "";
    if (!this.item.name) {
      mString = mString + "   请输入中文名"
    }
    if (!this.item.gender) {
      mString = mString + "   请选择性别"
    }
    if (!this.item.mobile_phone) {
      mString = mString + "   请输入办公手机"
    }
    if (!this.item.department_id_id) {
      mString = mString + "   请选择部门"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {

      if(this.item.certificate_image_ids){
        for(let i = 0; i < this.item.certificate_image_ids.length;i++){
          let img = this.item.certificate_image_ids[i]
          var fdStart = img.indexOf("http");
          if(fdStart==0){
           let shuzu =   img.split("/")
            this.item.certificate_image_ids[i] =shuzu[shuzu.length-1]
          }
        }
      }
      let upDate_item= {
        id: this.item.id,
        english_name :this.item.english_name,
        work_email:this.item.work_email,
        department_id: this.item.department_id_id,
        nation: this.item.nation_id,
        gender: this.item.gender_id,
        birthday: this.item.birthday,
        mobile_phone:this.item.mobile_phone,
        identification_id: this.item.identification_id,
        marital: this.item.marital_id,
        entry_date: this.item.entry_date,
        identification_A: this.item.identification_A,
        identification_B: this.item.identification_B,
        bank_card: this.item.bank_card,
        certificate_image_ids: this.item.certificate_image_ids,
      }

      if(this.item.image){
        var imStart = this.item.image.indexOf("http");
        if(fdStart==-1){
          this.editInformationService.pushHeardImageWithUid(this.item.image.split(",")[1],this.item.uid)
        }
      }


      this.employeeService.update_employee(upDate_item).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.alertCtrl.create({
            title: '提示',
            subTitle: '保存结束',
            buttons: [
              {
                text: '确定',
                handler: () => {
                  this.isModify = false;
                }
              }
            ]
          }).present();
        }
      })
    }


  }


  changeHeardImg() {
    this.photoType = "heard";
    this.addImg()
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
    if (this.photoType == "photoZhengshu") {
      this.item.certificate_image_ids.push(img_url)
    } else if (this.photoType == "photoPositive") {
      this.item.identification_A = img_url
    } else if (this.photoType == "photoNeagtive") {
      this.item.identification_B = img_url
    } else if (this.photoType == "photoBank") {
      this.item.bank_card = img_url
    } else if (this.photoType == "heard") {
      this.item.image = img_url
    }
  }

  // 拍摄正面
  takePositive() {
    this.addImg();
    this.photoType = "photoPositive";
  }

  // 拍摄反面
  takeNegative() {
    this.addImg();
    this.photoType = "photoNeagtive";
  }

  // 银行卡照片
  takeBankPhoto() {
    this.addImg();
    this.photoType = "photoBank";
  }

  // 证书照片
  takeZhengshuPhoto() {
    this.addImg();
    this.photoType = "photoZhengshu";
  }


  clickPositivePicture(item) {
    this.photoType = "photoPositive";
    this.clickPicture(item)
  }

  clickNeagtivePicture(item) {
    this.photoType = "photoNeagtive";
    this.clickPicture(item)
  }

  clickBankPicture(item) {
    this.photoType = "photoBank";
    this.clickPicture(item)
  }

  clickZhengshuPicture(item) {
    this.photoType = "photoZhengshu";
    this.clickPicture(item)
  }

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeletePicturePage", { item: item, EmployeeDetailPage: "EmployeeDetailPage" })
  }


  cancel() {
    let self = this 
    this.alertCtrl.create({
      title: '提示',
      subTitle: '数据未保存,确定退出编辑',
      buttons: [
        { text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.employeeService.get_employee_info([this.item.id], false).then(res => {
              console.log(res)
              if (res.result && res.result.res_code == 1) {
                self.item = res.result.res_data[0]
                self.isModify = false
              }
            })
          }
        }
      ]
    }).present();

  }

  goBack() {

   let workBenchPage =  Utils.getViewController("WorkBenchPage", this.navCtrl)
    this.navCtrl.popTo("workBenchPage")
  }



}
