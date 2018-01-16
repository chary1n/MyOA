import { NavParams } from 'ionic-angular/navigation/nav-params';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';

/**
 * Generated class for the RangtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rangtest',
  templateUrl: 'rangtest.html',
})
export class RangtestPage {
  canvas: any;
  ctx: any;
  boHeight: any;
  posHeight: any;
  step: any;
  lines: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RangtestPage');
    this.loop()
  }

  loop() {
    var canvas = <HTMLCanvasElement>document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 200 ;
    canvas.height = 80;
    var boHeight = canvas.height / 10;
    var posHeight = canvas.height / 1.2;
    var lines = ["rgba(0,222,255, 0.8)"];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.step == 80) {
      this.step = 0;
    }
    this.step = this.step + 20;
    for (var j = lines.length - 1; j >= 0; j--) {
      ctx.fillStyle = lines[j];
      var angle = (this.step + j * 50) * Math.PI / 180;
      var deltaHeight = Math.sin(angle) * boHeight;
      var deltaHeightRight = Math.cos(angle) * boHeight;
      ctx.beginPath();
      ctx.moveTo(0, posHeight + deltaHeight);
      ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(0, posHeight + deltaHeight);
      ctx.closePath();
      ctx.fill();
    }
  }

}
