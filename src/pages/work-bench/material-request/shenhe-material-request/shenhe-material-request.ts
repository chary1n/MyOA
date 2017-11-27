import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { materialService} from "./../materialService";
import { Utils } from './../../../../providers/Utils';
import { ShenPiMaterialAutoService} from './shenpi-material-auto'
/**
 * Generated class for the ShenheMaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shenhe-material-request',
  templateUrl: 'shenhe-material-request.html',
  providers:[materialService,ShenPiMaterialAutoService],
})
export class ShenheMaterialRequestPage {
  user_id;
  partner_id;
  employeeList;
  touxianList;
  select_name;
  type;
  title;
  product_final;
  line_final;
  item;
  select;
  beizhuText;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mService:materialService,
  public storage:Storage,public spMaterialAutoService:ShenPiMaterialAutoService,public toastCtrl:ToastController) {
    this.type = navParams.get('type')
    this.item = navParams.get('item')
    this.frontPage = Utils.getViewController("MaterialRequestPage", navCtrl)
    if (this.type == "final"){
      this.title = "送终审"
    }
    else{
      this.title = "送审"
    }
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.partner_id = res.result.res_data.partner_id;
        this.employeeList = [];
        this.touxianList = [];
        this.mService.get_final_review().then(res => {
          console.log(res)
          if (res.result && res.result.res_code == 1 && res.result.res_data)
          {
              for (let items of res.result.res_data) {
                if (items.review_type == "picking_review_line")
                {
                  this.employeeList.push(items.final_review_partner_id);
                  this.line_final = items.final_review_partner_id.id
                  this.touxianList.push("产线领用终审人");
                }
                else if (items.review_type == "picking_review_project")
                {
                  this.employeeList.push(items.final_review_partner_id);
                  this.product_final = items.final_review_partner_id.id
                  this.touxianList.push("工程领用终审人");
                }
              } 
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShenheMaterialRequestPage');
  }

  itemSelected(event){
    let search_text = event.name.replace("搜 姓名：", "")
    this.mService.search_employee(search_text).then(res => {
      this.employeeList = [];
      this.touxianList = [];
      console.log(res)
      if(res.result && res.result.res_code == 1 && res.result.res_data)
      {
         for (let items of res.result.res_data) {
               this.employeeList.push(items.partner_id);
               this.touxianList.push("");
          } 
      }
    })
  }

  itemSelect(item){
    this.select_name = item;
    this.select = this.select_name.name;
  }

  upload(){
    if (this.type == "final"){
      if (this.select_name.name){
        if (this.item.picking_type == "pick_type"){
        if (this.select_name.id == this.line_final){
          this.mService.action_to_next(this.item.id,this.beizhuText,this.user_id,true,this.item.picking_type,this.select_name.name,parseInt(this.select_name.id)).then(res => {
            if (res.result.res_data.success == 1){
               Utils.toastButtom("送审成功", this.toastCtrl)
                  this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
            }
          })
        }
        else
        {
          Utils.toastButtom(this.select_name.name + "不是产线领用终审人", this.toastCtrl)
        }
      }
      else
      {
        if (this.select_name.id == this.product_final){
          this.mService.action_to_next(this.item.id,this.beizhuText,this.user_id,true,this.item.picking_type,this.select_name.name,parseInt(this.select_name.id)).then(res => {
            if (res.result.res_data.success == 1){
               Utils.toastButtom("送审成功", this.toastCtrl)
                  this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
            }
          })
        }
        else
        {
          Utils.toastButtom(this.select_name.name + "不是工程领用终审人", this.toastCtrl)
        }
      }
      }
      else
      {
        Utils.toastButtom("请选择终审人", this.toastCtrl)
      }
    }
    else
    {
      if (this.select_name.name){
        this.mService.action_to_next(this.item.id,this.beizhuText,this.user_id,false,this.item.picking_type,this.select_name.name,parseInt(this.select_name.id)).then(res => {
            if (res.result.res_data.success == 1){
               Utils.toastButtom("送审成功", this.toastCtrl)
                  this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
            }
          })
      }
      else
      {
        Utils.toastButtom("请选择审核人", this.toastCtrl)
      }
    }
    
  }


}
