import { PhoneNumberPage } from './../phone-number/phone-number';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';

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
  name:any;
  user_heard: any;
  company:any;
  job:any;
  department:any;
  barcode:any;
  phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage:Storage,
  public actionSheetCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInformationPage');
    this.storage.get('user').then(res=>{
      this.name=res.result.res_data.name;
      this.user_heard = res.result.res_data.user_ava;
      this.company= res.result.res_data.company;
      this.job= res.result.res_data.job;
      if(this.job==false){
        this.job=''
      }
      this.department= res.result.res_data.department;
      if(this.department==false){
        this.department=''
      }
      this.barcode= res.result.res_data.barcode;
      this.phone= res.result.res_data.phone;
      if(this.phone==false){
        this.phone=''
      }
    })
  }

  changeHeardImg(){
    let actionSheet = this.actionSheetCtrl.create({
     title: '',
     buttons: [
       {
         text: '拍照',
        //  role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: '从手机相册选择',
         handler: () => {
           console.log('Archive clicked');
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

  toPhoneNumberPage(){
    this.navCtrl.push(PhoneNumberPage);
  }

}
