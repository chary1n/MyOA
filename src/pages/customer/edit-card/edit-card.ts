import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,Platform} from 'ionic-angular';
import { ChoosePage } from './../choose/choose';
import { Utils } from './../../../providers/Utils';
import { ProductlistPage} from './../productlist/productlist'
import { BiaoQianPage } from './../biao-qian/biao-qian';
import { CamCardPage } from './../cam-card/cam-card';
import { ChooseService} from './../choose/ChooseService'
import { Contacts, Contact, ContactField, ContactName,ContactFindOptions ,ContactFieldType,} from '@ionic-native/contacts';
import { pinyin } from './../cam-card/pinyin'; 
import { Storage } from '@ionic/storage'; 
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
  providers:[ChooseService,Contacts],
})
export class EditCardPage {
  @ViewChild('scroll') scrollElement: any;
  companyName:any;
  commentText;
  webName:any;
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

  saleteam_name:any;
  saleteam_id:any;
  saleman_id:any;
  saleman_name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
  public chooseService:ChooseService,private contacts: Contacts,public platform:Platform,public storage:Storage) {
    this.camPage = Utils.getViewController("CamCardPage", navCtrl)
    this.item = this.navParams.get('item');
    this.index = this.navParams.get('index');
    this.index_group = this.navParams.get('index_group');
    this.sourceArr = this.navParams.get('sourceArr');
    this.reloadView();

    // this.scrollElement._scrollContent.nativeElement.onscroll = event =>{
    //   alert(1);
    // }


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
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'country',
    });
  }

  clickSource(){
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'source',
    });
  }

  clickComefrom(){
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'comefrom',
    });
  }

  clickSeries(){
    this.saveInput();
    this.navCtrl.push('ProductlistPage', {
      items:this.item,
    })
  }

  clickBiaoQian(){
    this.saveInput();
    this.navCtrl.push('BiaoQianPage', {
      items:this.item,
    })
  }
  clickType(){
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'type',
    });
  }

  clickTeam(){
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'team',
    });
  }

  clicksaleman(){
    this.saveInput();
    this.navCtrl.push('ChoosePage', {
      items:this.item,
      type:'saleman',
    });
  }

  reloadView(){
    this.cardName = this.item.displayName;
    this.webName = this.item.web_site;
    this.telephoneName = this.item.all_phonenumers;
    this.departmentName = this.item.departmentName;
    this.emailName = this.item.email;
    this.addressName = this.item.address;
    this.companyName = this.item.companyName;
    this.commentText = this.item.comment;
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
     this.item.web_site = this.webName;
     this.item.phoneNumber = this.telephoneName;
     this.item.departmentName = this.departmentName;
     this.item.email = this.emailName;
     this.item.address = this.addressName;
     this.item.companyName = this.companyName;
     this.item.comment = this.commentText;
     
     if (this.item.companyName)
     {
        if (this.item.companyName.length > 0)
    {
      this.sourceArr[this.index_group].value[this.index] = this.item;
      self.camPage.formatContacts = this.sourceArr;
      self.navCtrl.popTo(self.camPage);
    }
    else
    {
      this.alertCtrl.create({
                  title: '提示',
                  subTitle: '请输入公司名',
                  buttons: [
                 {
                    text: '确定',
             }
      ]
    }).present();
    }
     }
     else
     {
        this.alertCtrl.create({
                  title: '提示',
                  subTitle: '请输入公司名',
                  buttons: [
                 {
                    text: '确定',
             }
      ]
    }).present();
     }
    
    
  }

  saveInput(){
     this.item.displayName = this.cardName ;
     this.item.web_site = this.webName;
     this.item.phoneNumber = this.telephoneName;
     this.item.departmentName = this.departmentName;
     this.item.email = this.emailName;
     this.item.address = this.addressName;
     this.item.companyName = this.companyName;
     this.item.comment = this.commentText;
  }

  panEvent($event){
     cordova.plugins.Keyboard.close();
  }

  drag(){
     alert(1)
  }

  goBack(){
    // this.alertCtrl.create({
    //               title: '升级',
    //               subTitle: '发现新版本,是否立即升级？',
    //               buttons: [{ text: '取消' },
    //              {
    //                 text: '确定',
    //                 handler: () => {
    //                   this.openUrlByBrowser('http://fir.im/MyOa');
    //              }
    //          }
    //   ]
    // }).present();
  }

  upload(){
    this.saveInput();
    if (this.item.companyName)
    {
      this.chooseService.add_partners([this.item]).then((res) => {
      if (res.result){
        this.alertCtrl.create({
                  title: '提示',
                  subTitle: '导入成功',
                  buttons: [
                 {
                    text: '确定',
                    handler: () => {
                     let options = new ContactFindOptions();  
      let fields: ContactFieldType[];  
      fields = ["displayName", "phoneNumbers"];  
      options.filter = "";  
      options.multiple = true;  
      options.hasPhoneNumber = true;    
      let list = [];
      this.contacts.find(fields, options).then((result) => {  
        for (var contact of result) {
          // if (contact.organizations){
            console.log(contact);
            if (contact.id == this.item.id)
            {
              contact.remove();
              this.camPage.data.need_fresh = true;
              this.navCtrl.popTo(this.camPage);
            }
        }
      });  
                 }
             }
  
           
      ]
    }).present();
        
        //  this.cd.detectChanges();
      }
      else
      {
        if (res.error)
        {
          this.alertCtrl.create({
                  title: '提示',
                  subTitle: res.error.data.message,
                  buttons: [
                 {
                    text: '确定',
                    handler: () => {
                     
                 }
             }
      ]
    }).present();
        }
      }
    });
  }
  else
  {
    this.alertCtrl.create({
                  title: '提示',
                  subTitle: '请确保选择导入的名片的公司名填写',
                  buttons: [
                 {
                    text: '确定',
             }
      ]
    }).present();
  }
    
  }
}
