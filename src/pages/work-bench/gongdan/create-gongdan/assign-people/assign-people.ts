import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ContactService } from '../../../../contact-person/contact-persionService';
import { Utils } from '../../../../../providers/Utils';
import { StatusBar } from '@ionic-native/status-bar';

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
  need_pop_reback;
  departments ;
  choosePeopleName ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contactService: ContactService,public statusbar:StatusBar) {
    this.need_pop_reback = this.navParams.get('need_pop_reback')
    this.choosePeopleName = this.navParams.get('choosePeopleName')
    if (this.need_pop_reback){
      this.frontPage = Utils.getViewController("RebackGongdanPage", navCtrl)
    }
    else
    {
      this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
    }
    this.departments =  this.navParams.get("departments")
    if(this.departments){
      this.contactService.get_department_employees(this.departments).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.employeeList = res.result.res_data;
          this.origin_data = this.employeeList;
          if(this.choosePeopleName){
            for(let i = 0;i<this.employeeList.length;i++){
              if(this.employeeList[i].name==this.choosePeopleName){
                this.employeeList[i].ischeck = true 
              }
            }
          }
        }
      })
    }else {
      this.contactService.get_all_employees().then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.employeeList = res.result.res_data;
          this.origin_data = this.employeeList;
          if(this.choosePeopleName){
            for(let i = 0;i<this.employeeList.length;i++){
              if(this.employeeList[i].name==this.choosePeopleName){
                this.employeeList[i].ischeck = true 
              }
            }
          }
        }
      })
    }
   
  }

  ionViewWillEnter() {
     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
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
    item.ischeck = !item.ischeck 
    if (item.ischeck){
      this.frontPage.data.choosePeopleItem = item
    }else{
      this.frontPage.data.choosePeopleItem = undefined
    }
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
