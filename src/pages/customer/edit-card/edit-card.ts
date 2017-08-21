import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChoosePage } from './../choose/choose';
import { Utils } from './../../../providers/Utils';
import { ProductlistPage} from './../productlist/productlist'
import { BiaoQianPage } from './../biao-qian/biao-qian';
/**
 * Generated class for the EditCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {
  companyName:any;
  cardName:any;
  telephoneName:any;
  departmentName:any;
  emailName:any;
  addressName:any;
  item:any;
  countryName:any;
  sourceName:any;
  seriesName:any;
  productNames:any;
  biaoqianName:any;
  saleTeamName:any;
  salePersonName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    this.reloadView();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCardPage');
  }

  ionViewDidEnter(){
    this.reloadView();
  }

  clickCountry(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'country',
    });
  }

  clickSource(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'source',
    });
  }

  clickComefrom(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'comefrom',
    });
  }

  clickSeries(){
    this.navCtrl.push(ProductlistPage, {
      items:this.item,
    })
  }

  clickBiaoQian(){
    this.navCtrl.push(BiaoQianPage, {
      items:this.item,
    })
    
  }

  reloadView(){
    this.cardName = this.item.displayName;
    this.telephoneName = this.item.phoneNumber;
    this.departmentName = this.item.departmentName;
    this.emailName = this.item.email;
    this.addressName = this.item.address;
    this.companyName = this.item.companyName;
    this.salePersonName = this.item.sale_person;
    this.saleTeamName = this.item.sale_team;
    // console.log(this.item.country_name )
    if (this.item.country_name)
    {
      this.countryName = this.item.country_name
    }
    else
    {
      this.countryName = "请选择 >"
    }
    if (this.item.source_name)
    {
      this.sourceName = this.item.source_name
    }
    else
    {
      this.sourceName = "请选择 >"
    }
    if (this.item.series_ids.length > 0)
    {
      let index = 0;
      let name = '';
      for (var item_pro in this.item.series_names) {
        if (name != '')
        {
          name =name + ',' + this.item.series_names[index]; 
        }
        else
        {
          name =this.item.series_names[index];
        }
        index ++;
      }
      this.productNames = name;
    }
    else
    {
      this.productNames = "请选择 >";
    }
    if (this.item.partner_type)
    {
      if (this.item.partner_type == "customer")
      {
        this.biaoqianName = "客户";
      }
      else
      {
        this.biaoqianName = "供应商";
      }
    }
    else
    {
      this.biaoqianName = " ";
    }
    if (this.item.partner_lv)
    {
      this.biaoqianName = this.biaoqianName + " " + "客户级别:" + this.item.partner_lv;
    }
    if (this.item.star_cnt)
    {
      this.biaoqianName = this.biaoqianName + " " + "星级:" + this.item.star_cnt;
    }
    if (!this.item.star_cnt && !this.item.partner_lv && !this.item.partner_type)
    {
      this.biaoqianName = "请选择 >";
    }
    this.seriesName = this.item.series_name ? this.item.series_name : "请选择 >";

    // this.sourceName = this.item.source_name ? this.item.source_name : "请选择 >";
    // this.seriesName = this.item.series_ids[0] ? this.item.series_ids[0] : "请选择 >";
  }

  save_camcard(){
    
  }
}
