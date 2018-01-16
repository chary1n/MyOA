import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Utils } from '../../../../../providers/Utils';

/**
 * Generated class for the ChooseDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose-department',
  templateUrl: 'choose-department.html',
  providers: []
})
export class ChooseDepartmentPage {
  departmentList ;
  frontPage;
  chooseList=[];
  chooseDepartmentName = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.frontPage = Utils.getViewController("WhoCanSeePage", navCtrl)
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseDepartmentPage');
  }
  
  ionViewWillEnter(){
    this.departmentList = this.navParams.get('departmentList')
    console.log(this.departmentList)
  }


  chooseItem(item) {
    item.ischeck = !item.ischeck
  }

  goBack(){
    this.navCtrl.pop();
  }


  conform(){
    for (let i = 0; i < this.departmentList.length; i++) {
      if(this.departmentList[i].ischeck){
        this.chooseList.push(this.departmentList[i].id)
        this.chooseDepartmentName = this.chooseDepartmentName +this.departmentList[i].name
      }
    }
    console.log(this.chooseList)
    this.frontPage.data.chooseList = this.chooseList
    this.frontPage.data.chooseDepartmentName = this.chooseDepartmentName
    this.frontPage.data.departmentList = this.departmentList
    this.navCtrl.popTo(this.frontPage)
  }

}
