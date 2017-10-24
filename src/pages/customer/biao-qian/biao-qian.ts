import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { EditCardPage } from './../edit-card/edit-card';
import { ChooseService} from './../choose/ChooseService';


/**
 * Generated class for the BiaoQianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-biao-qian',
  templateUrl: 'biao-qian.html',
    providers: [ChooseService],

})
export class BiaoQianPage {
  starArr:any;
  priority:any;
  color1:any;
  items:any;
  level_one_selected:any;
  level_two_selected:any;
  level_three_selected:any;
  customer_selected:any;
  supplier_selected:any;
  editPage:any;
  arr:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public chooseService:ChooseService) {
    this.editPage = Utils.getViewController("EditCardPage", navCtrl);
    this.starArr = ['1','1','1','1','1'];
    // this.priority = 0;
    this.items = this.navParams.get("items");
    if (this.items.partner_type == "customer")
    {
      this.customer_selected = true;
    }
    else
    {
      this.customer_selected = false;
    }

    if (this.items.partner_type =="supplier")
    {
      this.supplier_selected = true;
    }
    else
    {
      this.supplier_selected = false;
    }

    if (this.items.partner_lv == 1)
    {
      this.level_one_selected = true;
    }
    else
    {
      this.level_one_selected = false;
    }

    if (this.items.partner_lv == 2)
    {
      this.level_two_selected = true;
    }
    else
    {
      this.level_two_selected = false;
    }

    if (this.items.partner_lv == 3)
    {
      this.level_three_selected = true;
    }
    else
    {
      this.level_three_selected = false;
    }

    if (this.items.star_cnt)
    {
      this.priority = this.items.star_cnt;
    }
    else
    {
      this.priority = 0;
    }
    
    this.chooseService.get_partner_tag_list().then((res) => {
      this.arr = res.result;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiaoQianPage');
  }

  click(i){
    // this.priority = (4 - i) + this.priority + 1;
    this.priority = i + 1;
  }

  clickGray(i){
    this.priority = i + 1 + this.priority;
  }

  clickCustomer(){
    this.customer_selected = !this.customer_selected;
    if (this.customer_selected)
    {
      this.supplier_selected = false;
    }
  }

  clickSupplier(){
    this.supplier_selected = !this.supplier_selected;
    if (this.supplier_selected)
    {
      this.customer_selected = false;
    }
  }

  isCustomerSelected(){
    return this.customer_selected;
  }
  isSupplierSelected(){
    return this.supplier_selected;
  }

  click1st()
  {
    this.level_one_selected = !this.level_one_selected;
    if (this.level_one_selected)
    {
      this.level_two_selected = false;
      this.level_three_selected = false;
    }
  }

  click2nd(){
    this.level_two_selected = !this.level_two_selected;
    if (this.level_two_selected)
    {
      this.level_one_selected = false;
      this.level_three_selected = false;
    }
  }

  click3rd(){
    this.level_three_selected = !this.level_three_selected;
    if (this.level_three_selected)
    {
      this.level_one_selected = false;
      this.level_two_selected = false;
    }
  }

  is1stSelected(){
    return this.level_one_selected;
  }

  is2ndSelected(){
    return this.level_two_selected;
  }

  is3rdSelected(){
    return this.level_three_selected;
  }

  save_biaoqian()
  {
    let self = this;
    this.items.partner_type = "";
    this.items.category_id = "";
    this.items.partner_lv = "";
    if (this.customer_selected)
    {
      for (var item of this.arr) {
        if (item.name == "客户"){
          this.items.partner_type = "customer";
          this.items.category_id = item.category_id;
          break;
        }
        
      }
    }
    if (this.supplier_selected)
    {
      for (let item of this.arr) {
        if (item.name != "客户"){
          this.items.partner_type = "supplier";
          this.items.category_id = item.category_id;
          break;
        }  
      }
    }
    if (self.level_one_selected)
    {
      this.items.partner_lv = 1;
    }
    if (self.level_two_selected)
    {
      this.items.partner_lv = 2;
    }
    if (self.level_three_selected)
    {
      this.items.partner_lv = 3;
    }
    this.items.star_cnt = this.priority;
    self.editPage.item = this.items;
    self.navCtrl.popTo(self.editPage);
  }
}
