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
        for (var item of res.result) {
          let obj = {  
                name:'',
                  id:'',
          }; 
          obj.name = item.name;
          obj.id = item.src_id;
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
      let self = this;
      this.items.source_id = item.id;
      this.items.source_name = item.name;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
    else if (this.type == 'comefrom')
    {
      let self = this;
      // this.items.series_id[0] = item.id;
      this.items.series_name = item.name;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
    }
  }

}
