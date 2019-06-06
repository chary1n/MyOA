import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SaleReportService } from './sale-report-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import 'jquery'
declare var $: any;
declare let superTable: any;
/**
 * Generated class for the SaleReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-report',
  templateUrl: 'sale-report.html',
  providers: [SaleReportService, ScreenOrientation],
})
export class SaleReportPage {
  result
  adjust_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public saleService: SaleReportService,
    private screenOrientation: ScreenOrientation, public statusBar: StatusBar) {
    console.log(this.screenOrientation.type);


    // allow user rotate
    // this.screenOrientation.unlock();
    this.result = {}
    this.saleService.sale_data_for_sale_man({}).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.result = this.format_data(res.result.res_data)
        
        // setTimeout(function () {
        //   new superTable("sale_dashboard_templ_new_wrap", {
        //     cssSkin: "sDefault",
        //     fixedCols: 1, //固定几列
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
        for (var index = 0; index < this.result.columns.length * 2; index++) {
          this.adjust_arr.push('1')
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleReportPage');
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   
   //生成表格内容
            // let htmlLeft = '';
            // let htmlRight = '';
            // for(let i=1;i<=7;i++){
            //     htmlLeft +='<tr>';
            //     htmlLeft +='<td>'+i+'</td>';
            //     htmlLeft +='</tr>';
            // }
            // for(let i=1;i<=7;i++){
            //     htmlRight+='<tr>';
            //     htmlRight+='<td>A</td>';
            //     htmlRight+='<td>100</td>';
            //     htmlRight+='<td>500</td>';
            //     htmlRight+='<td>1</td>';
            //     htmlRight+='</tr>';
            // }
            // $('#left-table2').html(htmlLeft);
            // $('#right-table2').html(htmlRight);
            //滚动
            $('#right-div2').on('scroll',function(){
                let top=$(this).scrollTop();
                let left=$(this).scrollLeft();
                $('#left-div2').scrollTop(top);
                $('#right-div1').scrollLeft(left);
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
    return Math.round(value * 100) / 100
  }

  click_team_detail(team_item) {
    this.navCtrl.push('SaleReportDetailPage', {
      team_id: team_item.id,
      team_name: team_item.name
    })
  }

}
