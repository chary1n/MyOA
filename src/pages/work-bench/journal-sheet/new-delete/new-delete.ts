import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Utils } from '../../../../providers/Utils';
import { StatusBar } from '@ionic-native/status-bar';


/**
 * Generated class for the NewDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-delete',
  templateUrl: 'new-delete.html',
})
export class NewDeletePage {
  item;
  frontPage;
  need_back_write
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusbar:StatusBar) {
    this.need_back_write = this.navParams.get('need_back_write')
    this.item = this.navParams.get("item")
    if(this.need_back_write){
      this.frontPage = Utils.getViewController("WriteJournalPage", navCtrl)
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDeletePage');
  }

  ionViewWillEnter() {
    this.statusbar.backgroundColorByHexString("#2597ec");
   this.statusbar.styleLightContent();
 }

 delete(){
   this.frontPage.data.isDeletePicture = true
   this.navCtrl.popTo(this.frontPage)
 }
}
