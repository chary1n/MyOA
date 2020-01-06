import { NavController, NavParams, IonicPage , AlertController} from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LotteryService } from './lotteryService'
declare var Turntable;
/**
 * Generated class for the LotteryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lottery',
  templateUrl: 'lottery.html',
  providers: [LotteryService],
})
export class LotteryPage {
  turntabl;
  lottery_code;
  lottery_title;
  lottery_lines;
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public lotteryService: LotteryService,
    public alertCtrl: AlertController) {
    this.lottery_code = this.navParams.get('lottery_code')
    this.lottery_title = this.navParams.get('lottery_setting_title')
    this.lottery_lines = this.navParams.get('lottery_setting_line')
    this.uid = this.navParams.get('uid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LotteryPage');

    var values_lottery = []
    for (var i = 0; i < this.lottery_lines.length; i++) {
      var lotter_item = this.lottery_lines[i]
      values_lottery.push({
        id: i,
        name: lotter_item.rt_name,
        img: {
          width: 50,
          height: 50,
          src: ''
        },
        color: i % 2 == 0 ? '#fc796f' : '#fbe0e1',
        bg: i % 2 == 0 ? '#fffdeb' : '#ed6e71',
      })
    }

    this.turntabl = new Turntable({
      type: 'transition', //转盘转动类型
      size: 320, //转盘尺寸，默认为320
      textSpace: 15, //奖品名称距离转盘边距，默认为15
      imgSpace: 50, //奖品图片距离转盘边距，默认为50
      speed: 5, //transition动画持续多长时间，秒为单位
      ring: 8, //转动多少圈后到达终点，越大转速越快
      values: values_lottery, //奖品对象，根据传多少个奖品对象，自动生成相应数量的转盘抽奖内容
      container: document.getElementById('div_lot') //转盘的容器，如果设置了之后，new Turntable的时候会自动填充内容
    });
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_start() {
    var self = this
    var random_int = Math.floor(Math.random() * (1 - 100) + 100)
    var lottery_index = 0
    var final_index
    for (var i = 0; i < this.lottery_lines.length; i++) {
      lottery_index += this.lottery_lines[i].rt_percentage
      if (random_int <= lottery_index) {
        final_index = i
        break;
      }
    }
    if (final_index >= 0) {
      this.turntabl.goto(final_index, function (data) {
        self.lotteryService.set_lottery({ 'lottery_code': self.lottery_code, 'uid': self.uid, 'lottery_setting_id': self.lottery_lines[final_index].lottery_setting_id }).then(res => {
          if (res.result.res_code == 1) {
            let ctrl = self.alertCtrl;
            ctrl.create({
              title: '提示',
              message: "恭喜抽中了 " + self.lottery_lines[final_index].rt_name + ' ,请至人事处领取',
              buttons: [
                {
                  text: '确定',
                  handler: () => {
                    self.navCtrl.pop()
                  }
                }
              ],
            }).present()
          
          }
        })
      })
    }

  }
}
