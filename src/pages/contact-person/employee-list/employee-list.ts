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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeListPage');
  }

}
