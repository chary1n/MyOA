import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Component } from '@angular/core';

/**
 * Generated class for the PromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prompt',
  templateUrl: 'prompt.html',
})
export class PromptPage {
  item ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("data")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromptPage');
  }

  finish(){
    this.navCtrl.push("EmployeeDetailPage",{item:this.item})
  }


  addEmployee(){
    this.navCtrl.push("AddEmployeePage")
  }


  perfectEmployee(){
    this.navCtrl.push("EmployeeDetailPage",{item:this.item,isModify:true
})

  }


  


}
