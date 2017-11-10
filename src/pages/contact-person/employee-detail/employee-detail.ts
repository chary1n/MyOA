import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './../contact-persionService'

/**
 * Generated class for the EmployeeDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
  providers:[ContactService],
})
export class EmployeeDetailPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.items = navParams.get('items');
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailPage');
  }

}
