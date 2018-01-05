import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { GongDanService } from '../gongdanService';
import { Utils } from '../../../../providers/Utils';

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
export class WhoCanSeePage{
  companyIschoosed;
  frontPage;
  chooseList;
  chooseDepartmentName;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService: GongDanService) {
    this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhoCanSeePage');
  }

  ionViewWillEnter() {
    this.chooseList = this.navParams.get('chooseList')
    if(this.chooseList){
      this.companyIschoosed = false
      this.chooseDepartmentName = this.navParams.get('chooseDepartmentName')
      console.log(this.chooseDepartmentName)
    }
    console.log(this.chooseList)
  }


  conform() {
    this.frontPage.data.companyIschoosed = this.companyIschoosed
    if(this.companyIschoosed){
      this.frontPage.data.chooseList = []
    }else{
      this.frontPage.data.chooseList = this.chooseList
    }
    this.frontPage.data.chooseDepartmentName = this.chooseDepartmentName
    this.navCtrl.popTo(this.frontPage)
  }

  chooseCompany() {
    this.companyIschoosed = !this.companyIschoosed
    if(this.companyIschoosed){
      this.chooseList=[]
      this.chooseDepartmentName = ""
    }
    console.log(this.companyIschoosed)
  }

  chooseDepartment() {
    this.gongdanService.getDepartment().then(res => {
      console.log(res)
      if (res.result.res_code == 1) {
        this.navCtrl.push('ChooseDepartmentPage', { departmentList: res.result.res_data.all_departments.res_data })
      }
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

}
