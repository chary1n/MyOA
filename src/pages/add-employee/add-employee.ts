import { Utils } from './../../providers/Utils';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { NativeService } from './../../providers/NativeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { EmployeeService } from './EmployeeService';
import { GongDanService } from '../work-bench/gongdan/gongdanService';
import { ToastController } from 'ionic-angular';

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
  providers: [NativeService, EmployeeService]
})
export class AddEmployeePage {


  name;
  english_name;
  sexList = [{ name: '男', id: 'male' }, { name: '女', id: 'female' },{name :'其他',id:'other'}]
  gender;
  marriageList = [{ name: '未婚', id: 'single' }, { name: '已婚', id: 'married' }, { name: '离异', id: 'divorced' }, { name: '丧偶', id: 'widower' },]
  marital;
  work_phone;
  identification_id;
  birthday;
  minzuList;
  nation;
  departmentList;
  departmentIndex;
  photoType;
  zhengshuImgList = [];
  pushzhengshuImgList = [];
  imgPhotoBank;
  imgPhotoPositive; imgPhotoNeagtive;
  department_id;
  entry_date;

  constructor(public navCtrl: NavController,
    public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public employeeService: EmployeeService) {

    this.employeeService.get_employee_list().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.minzuList = res.result.res_data
      }
    })
    this.employeeService.getDepartmentNoLoading().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.departmentList = res.result.res_data.all_departments.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  // 拍摄正面
  takePositive() {
    this.addImg();
    this.photoType = "photoPositive";
  }

  // 拍摄反面
  takeNegative() {
    this.addImg();
    this.photoType = "photoNeagtive";
  }

  // 银行卡照片
  takeBankPhoto() {
    this.addImg();
    this.photoType = "photoBank";
  }

  // 证书照片
  takeZhengshuPhoto() {
    this.addImg();
    this.photoType = "photoZhengshu";
  }




  addImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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


  getPictureSuccess(img_url) {
    if (this.photoType == "photoZhengshu") {
      console.log(img_url)
      this.zhengshuImgList.push(img_url)
      this.pushzhengshuImgList.push(img_url.split(",")[1])
    } else if (this.photoType == "photoPositive") {
      this.imgPhotoPositive = img_url
    } else if (this.photoType == "photoNeagtive") {
      this.imgPhotoNeagtive = img_url
    } else if (this.photoType == "photoBank") {
      this.imgPhotoBank = img_url
    }
  }


  goBack() {
    this.navCtrl.pop();
  }

  next() {
    let mString = "";
    if (!this.name) {
      mString = mString + "   请输入中文名"
    }
    if (!this.gender) {
      mString = mString + "   请选择性别"
    }
    if (!this.work_phone) {
      mString = mString + "   请输入办公手机"
    }
    if (!this.department_id) {
      mString = mString + "   请选择部门"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      let departments;
       let data = {
        name : this.name,
        english_name:this.english_name,
        nation:this.nation,
        gender:this.gender,
        birthday:this.birthday,
        identification_id: this.identification_id,
        marital:this.marital,
        work_phone:this.work_phone,
        department_id:this.department_id,
        entry_date:this.entry_date,
        identification_A:this.imgPhotoPositive,
        identification_B:this.imgPhotoNeagtive,
        bank_card:this.imgPhotoBank,
        certificate_image_ids:this.pushzhengshuImgList,
      }
      this.navCtrl.push('CreateAccountPage', { data: data})
    }
  }


}
