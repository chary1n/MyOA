import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ShareknowledgedetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shareknowledgedetail',
  templateUrl: 'shareknowledgedetail.html',
})
export class ShareknowledgedetailPage{
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sanitizer: DomSanitizer) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareknowledgedetailPage');
  }
  assembleHTML(){ 
    　　return this.sanitizer.bypassSecurityTrustHtml(this.item.content)
    }

} 
