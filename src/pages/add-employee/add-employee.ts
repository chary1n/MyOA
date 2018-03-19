import { HttpService } from './../../providers/HttpService';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
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
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
import * as moment from 'moment';

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
  providers: [NativeService, EmployeeService, DatePipe]
})
export class AddEmployeePage {


  name;
  english_name;
  sexList = [{ name: '男', id: 'male' }, { name: '女', id: 'female' }]
  shiyongList = [{ name: '半个月', id: 'half_month' }, { name: '一个月', id: 'one_month' }, { name: '二个月', id: 'two_month' }
    , { name: '三个月', id: 'three_month' }, { name: '无', id: '' }]
  gender;
  marriageList = [{ name: '单身', id: 'single' }, { name: '已婚', id: 'married' }, { name: '离异', id: 'divorced' }, { name: '丧偶', id: 'widower' },]
  marital;
  mobile_phone;
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
  isDeletePicture = false;
  deletePicture;
  image = "";
  probation_date;
  shiyongDate;
  emergency_contact_name;
  emergency_contact_way;
  emergency_contact_relation;
  bank_card_num;
  bank_card_opening_bank;
  probation_period;
  constructor(public navCtrl: NavController,
    public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public datePipe: DatePipe,
    private alertCtrl: AlertController,
    public employeeService: EmployeeService) {

    this.employeeService.get_employee_list().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.minzuList = res.result.res_data
        for (let i = 0; i < this.minzuList.length; i++) {
          if (this.minzuList[i].name == "汉族") {
            this.nation = this.minzuList[i].id
          }
        }
      }
    })

    this.employeeService.getDepartmentNoLoading().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.departmentList = res.result.res_data.all_departments.res_data
      }
    })
    this.entry_date = Utils.dateFormat(new Date(), 'yyyy-MM-dd')

  }

  ionViewWillEnter() {
    this.isDeletePicture = this.navParams.get('isDeletePicture')
    if (this.isDeletePicture) {
      this.navParams.data.isDeletePicture = false;
      if (this.photoType == "photoPositive") {
        this.imgPhotoPositive = ""
      } else if (this.photoType == "photoNeagtive") {
        this.imgPhotoNeagtive = ""
      } else if (this.photoType == "photoBank") {
        this.imgPhotoBank = ""
      } else if (this.photoType == "photoZhengshu") {
        this.zhengshuImgList.splice(this.zhengshuImgList.indexOf(this.deletePicture), 1)
      }
    }
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


  clickPositivePicture(item) {
    this.photoType = "photoPositive";
    this.clickPicture(item)
  }

  clickNeagtivePicture(item) {
    this.photoType = "photoNeagtive";
    this.clickPicture(item)
  }

  clickBankPicture(item) {
    this.photoType = "photoBank";
    this.clickPicture(item)
  }

  clickZhengshuPicture(item) {
    this.photoType = "photoZhengshu";
    this.clickPicture(item)
  }


  watch(item) {
    if (this.entry_date && this.probation_period) {
      let d = moment(this.entry_date,"YYYY-MM-DD");
      let endDate;
      if (this.probation_period == "half_month") {
        endDate = d.add(15, "days").add(-1,'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "one_month") {
        endDate = d.add(1, "months").add(-1,'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "two_month") {
        endDate = d.add(2, "months").add(-1,'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "three_month") {
        endDate = d.add(3, "months").add(-1,'days').format("YYYY-MM-DD")
      }
      this.probation_date = (this.entry_date) + "   ~   " + endDate
    }
  }




  addImg(allowEdit: boolean = false) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1, allowEdit);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0, allowEdit);
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

  getPicture(type, allowEdit: boolean = false) {//1拍照,0从图库选择
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


  changeHeardImg() {
    this.photoType = "heard";
    this.addImg(true)
  }


  getPictureSuccess(img_url) {
    if (this.photoType == "photoZhengshu") {
      console.log(img_url)
      this.zhengshuImgList.push(img_url)
      // this.pushzhengshuImgList.push(img_url.split(",")[1])
    } else if (this.photoType == "photoPositive") {
      this.imgPhotoPositive = img_url
    } else if (this.photoType == "photoNeagtive") {
      this.imgPhotoNeagtive = img_url
    } else if (this.photoType == "photoBank") {
      this.imgPhotoBank = img_url
    } else if (this.photoType == "heard") {
      this.image = img_url
    }



  }


  goBack() {
    if (this.name || this.english_name
      || this.gender || this.birthday || this.identification_id || this.marital
      || this.mobile_phone || this.department_id ||
      this.imgPhotoPositive || this.imgPhotoNeagtive || this.imgPhotoBank || this.zhengshuImgList.length > 0) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  next() {

    if (this.entry_date > this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
      Utils.toastButtom("入职日期不可超过今天", this.toastCtrl)
      return;
    }

    let mString = "";
    if (!this.name) {
      mString = mString + "   请输入中文名"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.identification_id) {
      mString = mString + "   请输入身份证号"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.emergency_contact_name) {
      mString = mString + "   请输入紧急联系人姓名"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.emergency_contact_relation) {
      mString = mString + "   请输入与紧急联系人的关系"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.emergency_contact_way) {
      mString = mString + "   请输入紧急联系人联系方式"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.mobile_phone) {
      mString = mString + "   请输入办公手机"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.department_id) {
      mString = mString + "   请选择部门"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.entry_date) {
      mString = mString + "   请选择入职日期"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }


    let departments;
    let data = {
      name: this.name,
      english_name: this.english_name,
      nation: this.nation,
      gender: this.gender,
      birthday: this.birthday,
      identification_id: this.identification_id,
      marital: this.marital,
      mobile_phone: this.mobile_phone,
      department_id: this.department_id,
      entry_date: this.entry_date,
      identification_A: this.imgPhotoPositive,
      identification_B: this.imgPhotoNeagtive,
      bank_card: this.imgPhotoBank,
      certificate_image_ids: this.zhengshuImgList,
      edit_id: HttpService.user_id,
      image: this.image,
      bank_card_num: this.bank_card_num,
      bank_card_opening_bank: this.bank_card_opening_bank,
      emergency_contact_name: this.emergency_contact_name,
      emergency_contact_way: this.emergency_contact_way,
      emergency_contact_relation: this.emergency_contact_relation,
      probation_period: this.probation_period,

    }
    this.navCtrl.push('CreateAccountPage', { data: data })

  }

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeletePicturePage", { item: item, AddEmployeePage: "AddEmployeePage" })
  }


}
