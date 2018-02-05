import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Utils } from '../../../../../providers/Utils';

/**
 * Generated class for the DeletePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete-picture',
  templateUrl: 'delete-picture.html',
})
export class DeletePicturePage {
  item;
  frontPage ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.item = this.navParams.get("item")
    this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePicturePage');
  }

  delete(){
    this.frontPage.data.isDeletePicture = true
    this.navCtrl.popTo(this.frontPage)
  }


}
