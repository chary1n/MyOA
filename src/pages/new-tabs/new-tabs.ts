import {Tabs} from "ionic-angular";
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-tabs',
  templateUrl: 'new-tabs.html',
})
export class NewTabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  firstRoot:any= 'FirstShowPage';
  workRoot :any = 'NewWorkBenchPage';
  contactRoot:any  = 'ContactPersonPage';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTabsPage');
    this.tabs.select(1) 
  }

}
