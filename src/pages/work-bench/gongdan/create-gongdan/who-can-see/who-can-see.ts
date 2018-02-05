import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { GongDanService } from '../../gongdanService';
import { Utils } from '../../../../../providers/Utils';

/**
 * Generated class for the WhoCanSeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-who-can-see',
  templateUrl: 'who-can-see.html',
  providers: [GongDanService]
})
export class WhoCanSeePage {
  companyIschoosed;
  frontPage;
  chooseList;
  chooseDepartmentName;
  departmentList;
  need_pop_reback;
  showDepartmentList = false ;
  direction = "↓" ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService: GongDanService) {
      this.need_pop_reback = this.navParams.get('need_pop_reback')
    if (this.need_pop_reback){
      this.frontPage = Utils.getViewController("RebackGongdanPage", navCtrl)
    }
    else
    {
      this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
    }

    this.companyIschoosed = this.navParams.get("companyIschoosed")


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhoCanSeePage');
  }

  ionViewWillEnter() {
    this.chooseList = this.navParams.get('chooseList')
    this.departmentList = this.navParams.get('departmentList')
    if(!this.departmentList){
      this.gongdanService.getDepartment().then(res => {
        console.log(res)
        if (res.result.res_code == 1) {
         this.departmentList =  res.result.res_data.all_departments.res_data
        }
      })
    }
    if (this.chooseList) {
      this.companyIschoosed = false
      this.chooseDepartmentName = this.navParams.get('chooseDepartmentName')
      console.log(this.chooseDepartmentName)
    }
    console.log(this.chooseList)
  }


  conform() {
    this.frontPage.data.companyIschoosed = this.companyIschoosed
    if (this.companyIschoosed) {
      this.frontPage.data.chooseList = []
    } else {
      this.frontPage.data.chooseList = this.chooseList
    }
    this.frontPage.data.chooseDepartmentName = this.chooseDepartmentName
    this.frontPage.data.departmentList = this.departmentList
    this.navCtrl.popTo(this.frontPage)
  }

  chooseCompany() {
    this.companyIschoosed = !this.companyIschoosed
    if (this.companyIschoosed) {
      for (let i = 0; i < this.departmentList.length; i++) {
        this.departmentList[i].ischeck = false
      }
      this.chooseList = []
      this.chooseDepartmentName = ""
    }
    console.log(this.companyIschoosed)
  }

  chooseDepartment() {
    this.showDepartmentList = !this.showDepartmentList
    if(this.showDepartmentList){
      this.direction = "↑"
    }else{
      this.direction = "↓"
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  chooseItem(item) {
    item.ischeck = !item.ischeck
    this.conformClick()
  }

  conformClick(){
    this.chooseList = []
    for (let i = 0; i < this.departmentList.length; i++) {
      if(this.departmentList[i].ischeck){
        this.chooseList.push(this.departmentList[i].id)
        this.chooseDepartmentName = this.chooseDepartmentName +this.departmentList[i].name
      }
    }
    if(this.chooseList.length>0){
      this.companyIschoosed = false
    }

  }

}
