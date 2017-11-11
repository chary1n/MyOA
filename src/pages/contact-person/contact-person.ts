import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './contact-persionService'
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public contactService:ContactService) {
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
