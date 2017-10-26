import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import { CustomerService } from './../CustomerService';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';
declare let cordova: any; 
/**
 * Generated class for the CreateInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-info',
  templateUrl: 'create-info.html',
  providers:[CustomerService]
})
export class CreateInfoPage {
  arr:any = [];
  info:any;
  res_id:any;
  create_uid:any;
  author_id:any;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public customerService:CustomerService,
  public storage:Storage) {
    this.frontPage = Utils.getViewController("CustomerDetailPage", navCtrl)
    this.res_id = navParams.get('res_id')
     this.storage.get('user')
      .then(res => {
        console.log(res)
        this.create_uid = res.result.res_data.user_id;
        this.author_id = res.result.res_data.partner_id;
      });
    this.customerService.get_all_message_label().then((res) => {
      console.log(res);
      if(res.result.res_code == 1)
      {
        for (let item of res.result.res_data) {
            let obj = {
              id:item.id,
              name:item.name,
              isCheck:false,
            }
            this.arr.push(obj);
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInfoPage');
  }

  isCheck(item)
  {
    if (item.isCheck == "0")
    {
      return false;
    }
    else
    {
      return true;
    }
    // return false;
  }

  insertUserToArray(item){
    if (item.isCheck == "1")
    {
      item.isCheck = "0"
    }
    else
    {
      item.isCheck = "1";
    }
    let i = 0;
    for (var items of this.arr) {
      i ++;
      if (items.id == item.id)
      {
        this.arr[i - 1] = item;
        break;
      }
    }
  }

  upload(){
    let result_arr = ["question"];
    for (let item of this.arr) {
      if (item.isCheck == "1")
      {
        result_arr.push(item.id);
      }
    }

    let obj = {
      body:"<p>" + this.info + "</p>",
      res_id:this.res_id,
      create_uid:this.create_uid,
      message_label_ids:result_arr,
      author_id:this.author_id,  
    }
    
    this.customerService.createInfo(obj).then((res) => {
      console.log(res);
      if(res)
      {
        if(res.result.res_data.success == 1)
        {
          this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
        }
      }
    })

  }

  panEvent($event){
     cordova.plugins.Keyboard.close();
  }
 

}
