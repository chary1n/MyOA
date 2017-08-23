import { CustomerService } from './../../../../customer/CustomerService';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
  providers:[CustomerService]
})
export class CustomerListPage {
  pet: string = "3";
  dataSourceThird:any;
  dataSourceFirst:any;
  dataSourceSecond:any;
  dataSourceFourth:any;
  starArr:any;
  limit = 20;
  offset = 0;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  isMoreData4 = true;
  user_id;
  searchName1 :string ;
  searchName2 :string ;
  searchName3 :string ;
  searchName4 :string ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public customerService:CustomerService,private storage: Storage) {
    this.starArr = ['1','1','1','1','1'];
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');

    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
         this.clickCustomer()
      })
   
  }

  clickCustomer(){
    this.customerService.getNormalCustomer(20,0,this.user_id).then((res) => {
        console.log (res);
        this.dataSourceThird = res.result.res_data;
    })
  }

  clickXianSuo(){
    this.storage.get('user')
      .then(res => {
        this.customerService.get_clues(20,0,this.user_id).then((resa) => {
        console.log (resa);
        this.dataSourceFirst = resa.result.res_data;
      })
    })
    
  }

  clickQianZaiCustomer(){
    this.customerService.getQianZaiCustomer(20,0,this.user_id).then((res) => {
        console.log (res);
        this.dataSourceSecond = res.result.res_data;
    })
  }

  clickGongHaiCustomer(){
    this.customerService.getPublicCustomer(20,0,this.user_id).then((res) => {
        console.log (res);
        this.dataSourceFourth = res.result.res_data;
    })
  }


  doRefresh1(refresh) {
    this.isMoreData1 = true;
    this.limit = 20;
    this.offset = 0;

    this.customerService.get_clues(this.limit,this.offset,this.user_id).then((res) => {
        console.log (res);
        refresh.complete();
        this.dataSourceFirst = res.result.res_data;
    })
        
  }


  doInfinite1(infiniteScroll) {
    if (this.isMoreData1 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.customerService.get_clues(this.limit,this.offset,this.user_id).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData1 = true;
          }
          else {
            this.isMoreData1 = false;
          }
          for (let item of item_data) {
            this.dataSourceFirst.push(item);
          }
        }
        else {
          this.isMoreData1 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }
  searchClick1(){
    this.customerService.searchClues(this.searchName1,this.user_id)
      .then(res=>{
        if(res.result&&res.result.res_code==1){
          this.dataSourceFirst = res.result.res_data ;
        }
      })
  }

  doRefresh2(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;

    this.customerService.getQianZaiCustomer(this.limit,this.offset,this.user_id).then((res) => {
        console.log (res);
        refresh.complete();
        this.dataSourceSecond = res.result.res_data;
    })
        
  }


  doInfinite2(infiniteScroll) {
    if (this.isMoreData2 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.customerService.getQianZaiCustomer(this.limit,this.offset,this.user_id).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData2 = true;
          }
          else {
            this.isMoreData2 = false;
          }
          for (let item of item_data) {
            this.dataSourceSecond.push(item);
          }
        }
        else {
          this.isMoreData2 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  searchClick2(){
    this.customerService.searchHiddenCustomer(this.searchName2,this.user_id)
    .then(res=>{
      if(res.result&&res.result.res_code==1){
        this.dataSourceSecond = res.result.res_data ;
      }
    })
  }

  doRefresh3(refresh) {
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;

    this.customerService.getNormalCustomer(this.limit,this.offset,this.user_id).then((res) => {
        console.log (res);
        refresh.complete();
        this.dataSourceThird = res.result.res_data;
    })
        
  }


  doInfinite3(infiniteScroll) {
    if (this.isMoreData3 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.customerService.getNormalCustomer(this.limit,this.offset,this.user_id).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData3 = true;
          }
          else {
            this.isMoreData3 = false;
          }
          for (let item of item_data) {
            this.dataSourceThird.push(item);
          }
        }
        else {
          this.isMoreData3 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  searchClick3(){
    this.customerService.searchNormalCustomer(this.searchName3,this.user_id)
    .then(res=>{
      if(res.result&&res.result.res_code==1){
        this.dataSourceThird = res.result.res_data ;
      }
    })
  }

  doRefresh4(refresh) {
    this.isMoreData4 = true;
    this.limit = 20;
    this.offset = 0;

    this.customerService.getPublicCustomer(this.limit,this.offset,this.user_id).then((res) => {
        console.log (res);
        refresh.complete();
        this.dataSourceFourth = res.result.res_data;
    })
        
  }


  doInfinite4(infiniteScroll) {
    if (this.isMoreData4 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.customerService.getPublicCustomer(this.limit,this.offset,this.user_id).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData4 = true;
          }
          else {
            this.isMoreData4 = false;
          }
          for (let item of item_data) {
            this.dataSourceFourth.push(item);
          }
        }
        else {
          this.isMoreData4 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  searchClick4(){
    this.customerService.searchPublicCustomer(this.searchName4,this.user_id)
    .then(res=>{
      if(res.result&&res.result.res_code==1){
        this.dataSourceFourth = res.result.res_data ;
      }
    })
  }
}
