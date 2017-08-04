import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeliveryNotesDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-notes-detail',
  templateUrl: 'delivery-notes-detail.html',
})
export class DeliveryNotesDetailPage {
  item : any;
  type : any;
  loc_text:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    this.type = navParams.get('type');
    if (this.type == 'purchase')
    {
      this.loc_text = '源位置区域';
    }
    else{
      this.loc_text = '目的位置区域';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryNotesDetailPage');
  }

}
