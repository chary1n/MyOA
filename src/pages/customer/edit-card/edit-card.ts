import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChoosePage } from './../choose/choose';
import { Utils } from './../../../providers/Utils';
import { ProductlistPage} from './../productlist/productlist'
import { BiaoQianPage } from './../biao-qian/biao-qian';
import { CamCardPage } from './../cam-card/cam-card';
declare let cordova: any; 

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
  typeName:any;
  camPage:any;
  index:any;
  index_group:any;
  sourceArr:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.camPage = Utils.getViewController("CamCardPage", navCtrl)
    this.item = this.navParams.get('item');
    this.index = this.navParams.get('index');
    this.index_group = this.navParams.get('index_group');
    this.sourceArr = this.navParams.get('sourceArr');
    this.reloadView();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCardPage');
  }

  ionViewDidEnter(){
    this.reloadView();
  }

  ionViewWillLeave(){
    cordova.plugins.Keyboard.close();
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
  clickType(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'type',
    });
  }

  clickTeam(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'team',
    });
  }

  clicksaleman(){
    this.navCtrl.push(ChoosePage, {
      items:this.item,
      type:'saleman',
    });
  }

  reloadView(){
    this.cardName = this.item.displayName;
    this.telephoneName = this.item.phoneNumber;
    this.departmentName = this.item.departmentName;
    this.emailName = this.item.email;
    this.addressName = this.item.address;
    this.companyName = this.item.companyName;
    this.salePersonName = this.item.sale_person ? this.item.sale_person : "请选择 >";
    this.saleTeamName = this.item.sale_team ? this.item.sale_team :"请选择 >";
    this.typeName = this.item.type ? this.item.type : "请选择 >";
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
    let self = this;   
     this.item.displayName = this.cardName ;
     this.item.phoneNumber = this.telephoneName;
     this.item.departmentName = this.departmentName;
     this.item.email = this.emailName;
     this.item.address = this.addressName;
     this.item.companyName = this.companyName;
    this.sourceArr[this.index_group].value[this.index] = this.item; 
    // alert(this.telephoneName);
    self.camPage.formatContacts = this.sourceArr;
    self.navCtrl.popTo(self.camPage);
  }
}
