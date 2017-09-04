import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactListPage} from './../../work-bench/contact-list/contact-list'
/**
 * Generated class for the CustomerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  items:any;
  biaoqian:any;
  productName;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
    let tag = '';
    if (this.items.tag.length == 1)
    {
      tag =  this.items.tag[0] ;
    }
    else if (this.items.tag.length == 2)
    {
      tag = this.items.tag[0] + "/" + this.items.tag[1];
    }
    
    let level = '';
    let priority = '';
    if (this.items.level == 1)
    {
      level = " 1st";
    }
    else if (this.items.level == 2)
    {
      level = " 2nd";
    }
    else if (this.items.level == 3)
    {
      level = " 3rd";
    }
    if (this.items.priority)
    {
      priority = " 星级:" + this.items.priority;
    }
    this.biaoqian = tag + level + priority;

    if (this.items.product_series.length > 0)
    {
      let index = 0;
      let name = '';
      for (var item_pro of this.items.product_series) {
        if (name != '')
        {
          name = name + ',' + item_pro.name; 
        }
        else
        {
          name = item_pro.name;
        }
        index ++;
      }
      this.productName = name;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  contact_detail(){
    this.navCtrl.push(ContactListPage,{
          contactList:this.items.contracts,
       });  
  }

}
