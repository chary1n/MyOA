import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ContactService } from '../../../../contact-person/contact-persionService';
import { Utils } from '../../../../../providers/Utils';
declare let cordova: any;
/**
 * Generated class for the AssignPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.≈
 */
@IonicPage()
@Component({
  selector: 'page-assign-people',
  templateUrl: 'assign-people.html',
  providers: [ContactService]
})
export class AssignPeoplePage {
  employeeList;
  origin_data;
  chooseList = [];
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contactService: ContactService) {
    this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
    this.contactService.get_all_employees().then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.employeeList = res.result.res_data;
        this.origin_data = this.employeeList;
      }
    })
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.employeeList = this.origin_data.filter((item) => {
        console.log(item)
        if (item.name != '') {
          console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    else {
      this.employeeList = this.origin_data;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignPeoplePage');
  }

  choosePeople(item) {
    this.frontPage.data.choosePeopleItem = item
    this.navCtrl.popTo(this.frontPage)
  }

  conform() {
    for (let i = 0; i < this.employeeList.length; i++) {
      if (this.employeeList[i].ischeck) {
        this.chooseList.push(this.employeeList[i].id)
      }
    }
    console.log(this.chooseList)
    this.frontPage.data.assignList = this.chooseList
    this.navCtrl.popTo(this.frontPage)
  }


  panEvent($event) {
    cordova.plugins.Keyboard.close();
  }



}
