import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SaleReportService } from './../sale-report-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import 'jquery'
declare var $: any;
declare let superTable: any;

/**
 * Generated class for the SaleReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-report-detail',
  templateUrl: 'sale-report-detail.html',
  providers: [SaleReportService, ScreenOrientation],
})
export class SaleReportDetailPage {
  title
  team_id
  team_name
  result
  constructor(public navCtrl: NavController, public navParams: NavParams, public saleService: SaleReportService,
    private screenOrientation: ScreenOrientation, public statusBar: StatusBar) {
    this.team_id = this.navParams.get('team_id')
    this.team_name = this.navParams.get('team_name')
    this.title = this.team_name
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.result = {}
    this.saleService.get_team_dashboard({ 'team_id': this.team_id }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.result = this.format_data(res.result.res_data)
        // setTimeout(function () {
        //   new superTable("sale_dashboard_templ_new_wrap1", {
        //     cssSkin: "sDefault",
        //     // fixedCols: 1, //固定几列
        //     headerRows: 2,  //头部固定行数
        //     onStart: function () {
        //       // this.start = new Date();
        //     },
        //     onFinish: function () {
        //     }
        //   });

        //   // $("#sale_dashboard_templ_new_wrap").css("width", "1000px");//这个宽度是容器宽度，不同容器宽度不同
        //   // $(".sale_dashboard_templ_new_wrap").css("height", "400px");//这个高度是整个table可视区域的高度，不同情况高度不同
        //   let height_str = (window.innerHeight - 34 * 2 - 50) + "px"
        //   let width_str = '793px'
        //   //.sData是调用superTables.js之后页面自己生成的  这块就是出现滚动条 达成锁定表头和列的效果
        //   $(".sData").css("width", width_str);//这块的宽度是用$("#div_container")的宽度减去锁定的列的宽度
        //   $(".sData").css("height", height_str);//这块的高度是用$("#div_container")的高度减去锁定的表头的高度
        // }, 200)
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleReportDetailPage');
  }

  ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    $('#right-div3').on('scroll', function () {
      let top = $(this).scrollTop();
      let left = $(this).scrollLeft();
      $('#left-div3').scrollTop(top);
      $('#right-div4').scrollLeft(left);
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  format_data(target_data) {
    var result_0 = target_data.table_data;
    console.log(result_0);
    for (var i = 0; i < result_0.length; i++) {
      result_0[i]['sub_tot'] = [];
      for (var k = 0; k < target_data.columns.length; k++) {
        var add_val1 = 0;
        var add_val2 = 0;
        for (var j = 0; j < result_0[i].serial_data.length; j++) {
          // console.log(k)
          add_val1 = result_0[i].serial_data[j].val1 + add_val1;

          add_val2 = result_0[i].serial_data[j].val2 + add_val2;
        }
      }
      result_0[i]['sub_tot'].push({
        'type': 'float',
        'val': add_val1
      }, {
          'type': 'money',
          'val': add_val2
        });
    }
    target_data.table_data = result_0;
    var tot_len = target_data.columns.length;
    target_data.tot = [];
    for (var i = 0; i < tot_len; i++) {
      var tot_item1 = 0;
      var tot_item2 = 0;
      for (var j = 0; j < target_data.table_data.length; j++) {
        tot_item1 += target_data.table_data[j].serial_data[i].val1;
        tot_item2 += target_data.table_data[j].serial_data[i].val2;

      }
      target_data['tot'].push({
        'type': 'money',
        'val': tot_item1
      }, {
          'type': 'money',
          'val': tot_item2
        })
    }


    return target_data
  }

  fix2number(value) {
    var num = Math.round(value * 100) / 100 + ''
    if (num.indexOf('.') != -1) {
      return num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); //使用正则替换，每隔三个数加一个','
    }
    else {
      var result = '', counter = 0;
      num = (num || 0).toString();
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
      }
      return result
    }
  }
}
