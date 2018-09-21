// import { ReturnOrderDetailPage } from './../return-order-detail/return-order-detail';
// import { OrderDetailPage } from './../order-detail/order-detail';
import { orderService } from './orderService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Segment } from "ionic-angular";
import { OrderAutoService } from './order-auto';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { retry } from 'rxjs/operator/retry';
/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [orderService, OrderAutoService],
})
export class OrderPage {
  pet: string = "3";
  incomingOrder: any;
  orderMRP: any;
  priceOrder: any;
  returnOrder: any;
  limit = 20;
  offset = 0;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  isMoreData4 = true;
  searchName: any;
  returnOrderSearchName: any;
  to_approve_arr = []
  to_approve_title;

  // @ViewChild('mainSegment') mainSegment: Segment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public orderService: orderService, public orderAuto: OrderAutoService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    // this.mainSegment.setValue('1')
    // this.clickThree()
  }

  ionViewDidEnter() {
    if (this.pet == "3"){
      this.clickThree();
    }
  }

  clickOne() {
    this.orderService.requestMakeOrderByMRP(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.orderMRP = res.result.res_data
          console.log(this.orderMRP)
        }
      })
  }

  doRefresh1(refresh) {
    this.isMoreData1 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestMakeOrderByMRP(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.orderMRP = res.result.res_data;
    })
  }


  doInfinite1(infiniteScroll) {
    if (this.isMoreData1 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
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
            this.orderMRP.push(item);
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


  clickTwo() {
    this.orderService.requestPriceOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.priceOrder = res.result.res_data
          console.log(this.priceOrder)
        }
      })

  }

  doRefresh2(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestPriceOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.priceOrder = res.result.res_data;
    })
  }


  doInfinite2(infiniteScroll) {
    if (this.isMoreData2 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
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
            this.priceOrder.push(item);
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


  clickThree() {
    this.orderService.requestIncomingOrder(0, 20)
      .then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
          this.incomingOrder = res.result.res_data
          console.log(this.incomingOrder)
        }
      })
      this.orderService.get_to_approve_po().then(res => {
        if (res.result && res.result.res_code == 1)
        {
          console.log(res)
          this.to_approve_arr = res.result.res_data
          if (this.to_approve_arr)
          {
            this.to_approve_title = this.to_approve_arr.length + " >"
          }
          else
          {
            this.to_approve_title = "0" + " >"
          }
          
        }
      })
  }
  doRefresh3(refresh) {
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestIncomingOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.incomingOrder = res.result.res_data;
    })
  }


  doInfinite3(infiniteScroll) {
    if (this.isMoreData3 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
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
            this.incomingOrder.push(item);
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


  clickFour() {
    this.orderService.requestReturnOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.returnOrder = res.result.res_data
          console.log(this.returnOrder)
        }
      })

  }

  doRefresh4(refresh) {
    this.isMoreData4 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestReturnOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.returnOrder = res.result.res_data;
    })
  }


  doInfinite4(infiniteScroll) {
    if (this.isMoreData4 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestReturnOrder(this.offset, this.limit).then((res) => {
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
            this.returnOrder.push(item);
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

  orderDetail(items) {
    this.orderService.requestOrderDetail(items.id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('OrderDetailPage', {
            item: res.result,
            showNumber: false,
            state:items.state,
          })
        }
      })
  }

  // 显示开单数量和已接收
  orderDetailShowNumber(id) {
    this.orderService.requestOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('OrderDetailPage', {
            item: res.result,
            showNumber: true
          })
        }
      })
  }

  returnOrderDetail(id) {
    this.orderService.requestReturnOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('ReturnOrderDetailPage', {
            item: res.result,
            id: id,
          })
        }
      })
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 订单:", "")
    } else if (event.id == 2) {
      type = "product_id";
      search_text = event.name.replace("搜 产品:", "")
    } else if (event.id == 3) {
      type = "create_uid";
      search_text = event.name.replace("搜 采购负责人:", "")
    } else if (event.id == 4) {
      type = "origin";
      search_text = event.name.replace("搜 源单据:", "")
    }
    this.orderService.search(this.pet, type, search_text).then(res => {
      if (res.result && res.result.res_code == 1) {
        if (this.pet == "1") {
          this.isMoreData1 = false
          this.orderMRP = res.result.res_data
        } else if (this.pet == "2") {
          this.isMoreData2 = false
          this.priceOrder = res.result.res_data
        } else if (this.pet == "3") {
          this.isMoreData3 = false
          this.incomingOrder = res.result.res_data
        } else if (this.pet == "4") {
          this.isMoreData4 = false
          this.returnOrder = res.result.res_data
        }
      }
    })
  }

  returnOrderSearchClick(){
    this.orderService.returnOrderSearchByPO(this.returnOrderSearchName)
      .then(res=>{
        this.isMoreData4=false
        this.returnOrder = res.result.res_data
      })
  }
  
  changeState(state){
    console.log(state)
    if(state=="draft"){
      return "询价单"
    }else  if(state=="make_by_mrp"){
      return "由MRP生成"
    }else  if(state=="sent"){
      return "发送询价单"
    }else  if(state=="to approve"){
      return "待批准"
    }else  if(state=="done"){
      return "已锁定"
    }else  if(state=="cancel"){
      return "已取消"
    }else  if(state=="purchase"){
      return "采购订单"
    }
  }
  changeDuizhang(state){
    if(state=="no"){
      return "待出货"
    }else  if(state=="to invoice"){
      return "待对账"
    }else  if(state=="invoiced"){
      return "已对账完成"
    }else {
      return state
    }
  }


  toFix(amount){
    return amount.toFixed(2)
  }

  to_approve_click(){
    this.navCtrl.push('ApproveOrderPage',{
      incomingOrder:this.to_approve_arr,
    })
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

}
