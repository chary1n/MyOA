import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../../commonUseServices';
import { ShenGouService} from './../shengouService'

/**
 * Generated class for the CreateShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-shengou',
  templateUrl: 'create-shengou.html',
  providers: [CommonUseServices,ShenGouService],
})
export class CreateShengouPage {
  item:any;
  user_id:any;
  user_name:any;
  departmentList;
  department_name;
  department_id;
  department;
  production;
  // 添加的报销明细
  items = [];
  total: number = 0;
  data: any = [];
  employee_id;
  isAdd = false;
  index;
  isChange = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage :Storage,
  public commonService:CommonUseServices,public shenGouService:ShenGouService,public alertCtrl:AlertController) {
    this.storage.get('user')
    .then(res => {
      console.log(res);
      this.user_id = res.result.res_data.user_id;
      this.user_name = res.result.res_data.name;
      // this.department_id = res.result.res_data.department_id
      this.shenGouService.get_all_departments().then((res) => {
        console.log(res);
        this.departmentList = res.result.res_data.res_data;
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShengouPage');
  }

  ionViewWillEnter() {
    this.isAdd = this.navParams.get("isAdd")
    this.isChange = this.navParams.get("isChange")
    if (this.isAdd) {
      console.log(this.production)
      this.production = this.navParams.get('production')
      if (this.production) {
        this.items.push(this.production)
      }
      this.navParams.data.isAdd = false;
    }
    if (this.isChange) {
      let changeItem = this.items[this.items.length-1]
      this.items.splice(this.index, 1,changeItem);
      this.items.pop()
      this.navParams.data.isChange = false;
    }
    this.getTotalAmount()
  }

  changeProductItem(i) {
    this.index = i;
    this.navCtrl.push('AddApplyDetailPage', {
      item: this.items[i], index: i
      // , product: this.productList
    })
  }

  addApplyDetail() {
    this.navCtrl.push('AddShengouDetailPage', {
      // product: this.productList
    })
  }

  getTotalAmount() {
    if (this.items) {
      let total = 0;
      for (let item of this.items) {
        total = total + parseInt(item.amount)
      }
      this.total = total
    }
  }

  goBack() {
    if (this.department || this.items.length > 0) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }
}
