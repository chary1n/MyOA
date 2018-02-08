import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './contact-persionService'
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

declare let cordova: any; 

/**
 * Generated class for the ContactPersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-person',
  templateUrl: 'contact-person.html',
  providers:[ContactService]
})
export class ContactPersonPage {
  departmentList;
  employeeList;
  showAll;
  origin_data;
  company_type
  constructor(public navCtrl: NavController, public navParams: NavParams,public contactService:ContactService,
    public storage:Storage,public statusbar:StatusBar) {
    this.showAll = "NO";
      this.contactService.get_departments().then((res) => {
        if (res.result && res.result.res_code == 1)
        {
          this.departmentList = res.result.res_data;
        }
      })
      this.contactService.get_all_employees().then((res) => {
        if (res.result && res.result.res_code == 1)
        {
          this.employeeList = res.result.res_data;
          this.origin_data = this.employeeList;
        }
      })

      this.storage.get('user')
      .then(res => {
        if ((new RegExp("若态").test(res.result.res_data.company)) || res.result.res_data.company == "若态"){
            this.company_type = "assets/img/S-header.png"
            
          }
          else if ((new RegExp("DIY").test(res.result.res_data.company)) || res.result.res_data.company == "DIY"){
            this.company_type = "assets/img/D-header.png"
            
          }
          else if ((new RegExp("若贝尔").test(res.result.res_data.company)) || res.result.res_data.company == "若贝尔"){
            this.company_type = "assets/img/R-header.png"
            
          }
          else if ((new RegExp("板厂").test(res.result.res_data.company)) || res.result.res_data.company == "板厂"){
            this.company_type = "assets/img/B-header.png"
            
          }
      })
  }

  ionViewWillEnter(){
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPersonPage');
  }

  clickItem(item){
    this.contactService.get_department_detail(item.id).then((res) => {
      if (res.result && res.result.res_code == 1)
        {
          this.navCtrl.push('EmployeeListPage',{
              items:res.result.res_data,
              title:item.name,
          })
        }
    })
  }

  itemSelect(item){
    this.navCtrl.push('EmployeeDetailPage',{
      item:item,
    })
  }

  clickAll(){
    if (this.showAll == "YES"){
      this.showAll = "NO";
    }
    else
    {
      this.showAll = "YES";
    }
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.employeeList = this.origin_data.filter((item) => {
        console.log(item)
        if (item.name != '')
        {
          console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    else{
      this.employeeList = this.origin_data;
    } 
  }

  panEvent($event){
     cordova.plugins.Keyboard.close();
  }



}
