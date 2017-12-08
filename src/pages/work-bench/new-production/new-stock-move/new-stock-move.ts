import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,Slides } from 'ionic-angular';

/**
 * Generated class for the NewStockMovePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-stock-move',
  templateUrl: 'new-stock-move.html',
})
export class NewStockMovePage {
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewStockMovePage');
  }

  getFirst(item)
  {
    return "源单据:"+item.origin 
  }

  getSecond(item)
  {
    return "参考:" + item.picking_id
  }

  getThird(item){
    return "说明:" + item.product_id.product_name
  }

  getType(items){
    let str = "";
    if (items.move_order_type == "procurement_warehousing")
    {
      str = "采购入库"
    }
    else if (items.move_order_type == "purchase_return")
    {
      str = "采购退货"
    }
    else if (items.move_order_type == "sell_return")
    {
      str = "销售退货"
    }
    else if (items.move_order_type == "sell_out")
    {
      str = "销售出库"
    }
    else if (items.move_order_type == "manufacturing_orders")
    {
      str = "制造入库"
    }
    else if (items.move_order_type == "manufacturing_picking")
    {
      str = "制造领料"
    }
    else if (items.move_order_type == "inventory_in")
    {
      str = "盘点入库"
    }
    else if (items.move_order_type == "inventory_out")
    {
      str = "盘点出库"
    }
    return str;
  }

  getState(items){
    let state_str = ""
    if (items.state == "done"){
      state_str = "完成"
    }
    else if (items.state == "confirmed")
    {
      state_str = "已确认"
    }
    return state_str
  }

  getChuku(items){
    return "出入库数量:" + items.product_uom_qty
  }

  getKucun(items){
    return "当前库存数:" + items.quantity_adjusted_qty
  }

}
