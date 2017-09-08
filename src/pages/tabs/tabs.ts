import { ContactPersonPage } from './../contact-person/contact-person';
import { WorkBenchPage } from './../work-bench/work-bench';
import { MsgPage } from './../msg/msg';
import { MePage } from './../me/me';
import {Tabs} from "ionic-angular";
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
<<<<<<< HEAD
  meRoot :any ='MePage';
  msgRoot:any = 'MsgPage';
  workRoot :any = 'WorkBenchPage';
  contactRoot  = 'ContactPersonPage' ;
=======
  meRoot :any ="MePage";
  msgRoot:any = MsgPage;
  workRoot :any = WorkBenchPage;
  contactRoot  = ContactPersonPage ;
>>>>>>> 2ca99e8347d78b359acd99d303f325f8b70ae297

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.tabs.select(0);     
  }

}
