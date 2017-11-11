import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './../contact-persionService'
declare let cordova: any; 
/**
 * Generated class for the EmployeeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html',
  providers:[ContactService]
})
export class EmployeeListPage {
  items:any;
  title;
  origin_data;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
    this.title = navParams.get('title');
    this.origin_data = this.items;
    // console.log(this.items)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeListPage');
  }

  itemSelect(item){
    this.navCtrl.push('EmployeeDetailPage',{
      item:item,
    })
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.origin_data.filter((item) => {
        // console.log(item)
        if (item[0].name != '')
        {
          // console.log(item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    else{
      this.items = this.origin_data;
    } 
  }

  panEvent($event){
     cordova.plugins.Keyboard.close();
  }

}
