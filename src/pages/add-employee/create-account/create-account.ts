import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Utils } from './../../../providers/Utils';
import { EmployeeService } from './../EmployeeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
  providers:[EmployeeService]
})
export class CreateAccountPage {
  showInput;
  email ;
  chooseOpen = false;
  chooseClose = false ;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public employeeService: EmployeeService) {
    this.data = this.navParams.get("data")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }


  checkOpen(){
    this.chooseOpen = !this.chooseOpen
    if(this.chooseOpen){
      this.chooseClose = false
    }
  }


  checkClose(){
    this.chooseClose = !this.chooseClose
    if(this.chooseClose){
      this.chooseOpen = false
    }

  }


  goBack(){
    this.navCtrl.pop();
  }


  next(){
    if(this.checkOpen){
      if(!this.email){
        Utils.toastButtom("请输入邮箱", this.toastCtrl)
        return ;
      }
    }
    this.data.work_email = this.email
    this.employeeService.create_employee(this.data).then(res=>{
      if (res.result.res_data && res.result.res_code == 1) {
        this.navCtrl.push("PromptPage",{data :res.result.res_data })
      }
    })
  }
  

}
