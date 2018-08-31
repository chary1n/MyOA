import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';

/**
 * Generated class for the SelectPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-person',
  templateUrl: 'select-person.html',
  providers: [FirstShowService]
})
export class SelectPersonPage {
  uid;
  employeeList;
  selectList = []
  frontPage:any;
  type;
  origin_data
  limit
  offset
  isMoreData=true
  partner_id_s_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public firstShow: FirstShowService, public storage:Storage,) {
                this.frontPage = Utils.getViewController("CalendarDeatilpagePage", navCtrl)
                this.type = this.navParams.get('type')
                if(this.type==1){
                  this.selectList = this.navParams.get('selectList')
                }else if(this.type==2){
                  this.partner_id_s_id = this.navParams.get('partner_id_s_id')
                }
                this.limit = 40
                this.offset = 0
  }

  choosePeople(item){
    if(this.type==1){
      item.ischeck = !item.ischeck
      if(item.ischeck){
        this.selectList.push(item)
      }else{
        for(var i=0;i<this.selectList.length;i++){
          if(item.partner_id == this.selectList[i].partner_id){
            this.selectList.splice(i,1)
            break
          }
        }
      }
    }else if(this.type==2){
      if(item.partner_id==this.partner_id_s_id){
        this.navCtrl.pop()
      }else{
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.pet = 5;
        this.frontPage.data.partner_id_s_id = item.partner_id;
        this.frontPage.data.partner_id_s_name = item.partner_name;
        this.navCtrl.popTo(this.frontPage);
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPersonPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user').then(res =>{
      this.uid = res.result.res_data.user_id;
      let body = {
        'uid': this.uid,
        'limit': this.limit,
        'offset': this.offset
    }
    this.firstShow.get_all_partner(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
          this.employeeList = res.result.res_data
          this.origin_data = this.employeeList
          if(this.type==1){
            this.setCheck()
          }else if(this.type==2){
            for (let j = 0; j < this.employeeList.length; j++) {
              if(this.employeeList[j].partner_id==this.partner_id_s_id){
                this.employeeList[j].ischeck=true
              }
            }
          }
      }
     })
    })
  }
  goBack(){
    this.navCtrl.pop();
  }
  cancel(){
    this.navCtrl.pop();
  }

  finish(){
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.pet = 3;
    this.frontPage.data.selectList = this.selectList;
    this.navCtrl.popTo(this.frontPage);
  }

  searchByKeyword(event){
    if(!event.target.value){
      return
    }
    this.isMoreData = false
    let body = {
      'uid': this.uid,
      'name': event.target.value
    }
    this.firstShow.search_one_partner(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.employeeList = res.result.res_data;
        if(this.type==1){
          this.setCheck()
        }else if(this.type==2){
          for (let j = 0; j < this.employeeList.length; j++) {
            if(this.employeeList[j].partner_id==this.partner_id_s_id){
              this.employeeList[j].ischeck=true
            }
          }
        }
      }
    })
  }

  clearText() {
    this.employeeList = this.origin_data
  //   this.limit = 40;
  //   this.offset = 0;
    this.isMoreData = true
  //   let body = {
  //     'uid': this.uid,
  //     'limit': this.limit,
  //     'offset': this.offset
  // }
  //   this.firstShow.get_all_partner(body).then((res) => {
  //     if (res.result && res.result.res_code == 1) {
  //       this.employeeList = res.result.res_data;
  //       this.origin_data = this.employeeList;
  //     }
  //   })
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 40;
      this.offset += 40;
      let body = {
        'uid': this.uid,
        'limit': this.limit,
        'offset': this.offset
    }
      this.firstShow.get_all_partner(body).then((res) => {
        if (res.result && res.result.res_code == 1) {
          if (res.result.res_data) {
            if (res.result.res_data.length == 40) {
              this.isMoreData = true;

            }
            else {
              this.isMoreData = false;
            }
            for (let item of res.result.res_data) {
              this.employeeList.push(item);
              this.setCheck()
              this.origin_data = this.employeeList
            }
          }
          else {
            this.isMoreData = false;
          }

        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    }
    else {
      infiniteScroll.complete();
    }
  }

  //比较选中的人
  setCheck(){
    // for (let i = 0; i < this.employeeList.length; i++) {
    //   if(this.selectList.indexOf(this.employeeList[i].partner_id)!=-1){
    //     this.employeeList[i].ischeck=true
    //   }
    // }
    for(let i=0;i<this.selectList.length; i++){
      for (let j = 0; j < this.employeeList.length; j++) {
        if(this.selectList[i].partner_id==this.employeeList[j].partner_id){
            this.employeeList[j].ischeck=true
            break
        }
      }
    }
  }
}
