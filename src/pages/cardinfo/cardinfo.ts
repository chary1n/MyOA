import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
/**
 * Generated class for the CardinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cardinfo',
  templateUrl: 'cardinfo.html',
})
export class CardinfoPage {

  constructor(public actionSheetCtrl: ActionSheetController) {}

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardinfoPage');
  }

takePhoto(){
  {
   let actionSheet = this.actionSheetCtrl.create({
     title: '请选择添加方式',
     buttons: [
       {
         text: '手动输入',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: '扫描名片',
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
}

}
