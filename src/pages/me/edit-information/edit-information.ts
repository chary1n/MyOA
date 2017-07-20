import { NativeService } from './../../../providers/NativeService';
import { PhoneNumberPage } from './../phone-number/phone-number';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
})
export class EditInformationPage {
  name: any;
  user_heard: any;
  company: any;
  job: any;
  department: any;
  barcode: any;
  phone: any;
  isChange: boolean = false;//头像是否改变标识
  avatarPath: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private nativeService: NativeService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInformationPage');
    this.storage.get('user').then(res => {
      this.name = res.result.res_data.name;
      this.user_heard = res.result.res_data.user_ava;
      this.company = res.result.res_data.company;
      this.job = res.result.res_data.job;
      if (this.job == false) {
        this.job = ''
      }
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
    this.navCtrl.push(PhoneNumberPage);
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
    this.isChange = true;
    this.user_heard = img_url;
  }

}
