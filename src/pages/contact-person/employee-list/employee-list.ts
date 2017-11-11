import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './../contact-persionService'
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
    console.log(this.items)
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
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    // console.log(val)
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.origin_data.filter((item) => {
        console.log(item)
        if (item[0].name != '')
        {
          console.log(item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        // else
        // {
        //   return this.items;
        // }
      })
    }
    else{
      this.items = this.origin_data;
    }
    
  }

}
