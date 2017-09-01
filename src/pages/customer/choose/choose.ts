import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseService} from './ChooseService';
import { EditCardPage } from './../edit-card/edit-card';
import { Utils } from './../../../providers/Utils';
/**
 * Generated class for the ChoosePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
  providers: [ChooseService],
})
export class ChoosePage {
  items:any;
  type:any;
  title:any;
  data:any = [];
  editPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public chooseService :ChooseService) {
    this.editPage = Utils.getViewController("EditCardPage", navCtrl)
    this.items = this.navParams.get('items');
    this.type = this.navParams.get('type');
    if (this.type == 'country')
    {
      this.title = "国家";
      this.chooseService.get_countries().then((res) => {
        console.log(res);
         
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.country_id;
          this.data.push(obj);
        }
      });
    }
    else if (this.type == 'source')
    {
      this.title = "来源";
      this.chooseService.get_origins().then((res) => {
        console.log(res);
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.src_id;
          // alert(item.src_id);
          this.data.push(obj);
        }
      });
    }
    else if (this.type == 'comefrom')
    {
      this.title = "渠道";
      this.chooseService.get_sources().then((res) => {
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.source_id;
          this.data.push(obj);
        }
      });
    }
    else if (this.type == 'type'){
      this.title = "联系人类型";
      let obj_one = {  
                name:'',
                  id:'',
          };
          let obj_two = {  
                name:'',
                  id:'',
          };
          let obj_three = {  
                name:'',
                  id:'',
          };
          let obj_four = {  
                name:'',
                  id:'',
          };
      obj_one.name = "联系人";
      this.data.push(obj_one);
      obj_two.name = "开票地址";
      this.data.push(obj_two);
      obj_three.name = "送货地址";
      this.data.push(obj_three);
      obj_four.name = "其他地址";
      this.data.push(obj_four);
    }
    else if (this.type == 'team')
    {
      this.title = "销售团队";
      this.chooseService.get_saleteam_list().then((res) => {
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.team_id;
          this.data.push(obj);
        }
      })
    }
    else if (this.type == 'saleman')
    {
      this.title = "销售员";
      this.chooseService.get_saleman_list().then((res) => {
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.partner_id;
          this.data.push(obj);
        }
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }

  itemSelected(item){
    if (this.type == 'country')
    {
      let self = this;
      this.items.country_id = item.id;
      this.items.country_name = item.name;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
    else if (this.type == 'source')
    {
      // alert(item.id + item.name);
      let self = this;
     this.items.series_name = item.name;
      this.items.crm_source_id = item.id;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
    else if (this.type == 'comefrom')
    {
      let self = this;
      // this.items.series_id[0] = item.id;
       this.items.source_id = item.id;
      this.items.source_name = item.name;
      
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
    else if (this.type == 'type')
    {
      let self = this;
      this.items.type = item.name;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }

    // obj.sale_team = this.saleteam_name;
    //   obj.sale_person = this.saleman_name;
    //   obj.saleteam_id = this.saleteam_id;
    //   obj.saleman_id = this.saleman_id;
    else if (this.type == 'team')
    {
      let self = this;
      this.items.sale_team = item.name;
      this.items.saleteam_id = item.id;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
    else if (this.type == 'saleman')
    {
      let self = this;
      this.items.sale_person = item.name;
      this.items.saleman_id = item.id;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
  }

}
