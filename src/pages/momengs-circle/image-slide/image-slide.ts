import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides} from 'ionic-angular';
import { ViewChild } from '@angular/core'

/**
 * Generated class for the ImageSlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-image-slide',
  templateUrl: 'image-slide.html',
})
export class ImageSlidePage {

  imgList = []

  @ViewChild('mySlide') mySlide : Slides;

 
  index=0
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.imgList = this.navParams.get('imgList')
     this.index = this.navParams.get('index')

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageSlidePage');
    // this.mySlide.slideTo(2, 500);//第三个，500毫秒。
    this.mySlide.initialSlide=this.index
  }


  goback(){
    this.navCtrl.pop()
  }
}
