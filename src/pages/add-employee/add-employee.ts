import { NativeService } from './../../providers/NativeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';

/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
  providers:[NativeService]
})
export class AddEmployeePage {


  cName;
  eName;
  sexList=[{ name: '男', id: '1' }, { name: '女', id: '2' }]
  sexIndex ;
  phoneNumber ;
  IDNumber;
  constructor(public navCtrl: NavController, 
    public nativeService: NativeService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  takePositive(){

  }

  takeNegative(){

  }


  getPicture(type) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }


  getPictureSuccess(img_url){

  }


  goBack(){
    
  }

  next(){

  }


}
