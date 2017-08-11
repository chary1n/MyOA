import { InspectionDetailPage } from './../inspection-detail/inspection-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IncomingDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-incoming-detail',
  templateUrl: 'incoming-detail.html',
})
export class IncomingDetailPage {
  item : any;
  count: any;
  type:any;
  isPop:boolean ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = navParams.get('item');
      this.type = navParams.get('type');
      this.isPop = navParams.get('isPop') ;
      this.count = 1;
      console.log('ionViewDidEnter IncomingDetailPage');
      this.item.min_date = new Date (new Date(this.item.min_date).getTime()+8*3600*1000).toString();
      console.log(this.item.min_date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingDetailPage');
    
  }

  ionViewDidEnter(){
      console.log('ionViewDidEnter IncomingDetailPage');
      this.item = this.navParams.get('item');
      this.isPop = this.navParams.get('isPop');
      this.count = 1;
  }

  toInspectionPage(){
    this.navCtrl.push(InspectionDetailPage,{item:this.item})
  }

  moreDetail(){
    
  }
  
}
