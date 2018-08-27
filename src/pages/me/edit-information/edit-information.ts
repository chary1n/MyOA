import { EditInformationService } from './editInformationService';
import { NativeService } from './../../../providers/NativeService';
// import { PhoneNumberPage } from './../phone-number/phone-number';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';


/**
 * Generated class for the EditInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-information',
  templateUrl: 'edit-information.html',
  providers: [EditInformationService],
})
export class EditInformationPage {
  name: any;
  user_heard: any;
  company: any;
  job='';
  jobName;
  department: any;
  barcode: any;
  phone: any;
  isChange: boolean = false;//头像是否改变标识
  avatarPath: string;
  loginIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private nativeService: NativeService,
    private editInformationService: EditInformationService) {
  }

  ionViewDidEnter() {
    this.storage.get('user').then(res => {
      this.name = res.result.res_data.name;
      this.user_heard = res.result.res_data.user_ava;
      this.company = res.result.res_data.company;
      this.jobName = res.result.res_data.job;
      this.storage.get("loginIndex").then(res => {
        this.loginIndex = res
        if(this.loginIndex==0){
          if (this.jobName == false) {
            this.job = ''
          }else{
            if(this.jobName.length==1){
              this.job = this.jobName[0]
            }else{
              let length = this.jobName.length
              for(var i=0;i<length-1;i++){
                this.job = this.job + this.jobName[i]+','
              }
              this.job = this.job+this.jobName[length-1]
            }
          }
        }else{
          if (this.jobName == false) {
            this.job = ''
          }else{
            this.job = this.jobName
          }
        }
      })
      this.department = res.result.res_data.department;
      if (this.department == false) {
        this.department = ''
      }
      this.barcode = res.result.res_data.barcode;
      this.phone = res.result.res_data.phone;
      if (this.phone == false) {
        this.phone = ''
      }
    })
  }

  changeHeardImg() {
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

  toPhoneNumberPage() {
    this.navCtrl.push("PhoneNumberPage");
  }

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      allowEdit: true,
      quality: 6,//图像质量，范围为0 - 100
      circle: true
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
    this.isChange = true;
    this.user_heard = img_url;
    this.editInformationService.pushHeardImage(img_url.split(",")[1])
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.storage.get('user').then(userBean => {
            userBean.result.res_data.user_ava = res.result.res_data.user_ava
            this.storage.set('user', userBean)
          })
        }
      })
  }

}