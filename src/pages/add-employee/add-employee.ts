import { HttpService } from './../../providers/HttpService';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Utils } from './../../providers/Utils';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { NativeService } from './../../providers/NativeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from './EmployeeService';
import { GongDanService } from '../work-bench/gongdan/gongdanService';
import { ToastController, Content } from 'ionic-angular';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
import { pinyin } from './../customer/cam-card/pinyin';
import { StatusBar } from '@ionic-native/status-bar';
import * as moment from 'moment';
declare let cordova: any;

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
  @ViewChild('contentstep1') content_step1: Content;
  @ViewChild('contentstep2') content_step2: Content;
  @ViewChild('contentstep3') content_step3: Content;
  @ViewChild('contentstep4') content_step4: Content;
  name;
  english_name;
  sexList = [{ name: '男', id: 'male' }, { name: '女', id: 'female' }]
  shiyongList = [{ name: '半个月', id: 'half_month' }, { name: '一个月', id: 'one_month' }, { name: '二个月', id: 'two_month' }
    , { name: '三个月', id: 'three_month' }, { name: '无', id: '' }]
  gender;
  marriageList = [{ name: '未婚', id: 'S' }, { name: '已婚', id: 'M' }, { name: '离异', id: 'D' }, { name: '丧婚', id: 'W' }, { name: '再婚', id: 'R' }]

  mining_productivity_list = [{ name: '实习', id: 4 }, { name: '派遣工', id: 2 },
  { name: '试用', id: 5 }, { name: '正式', id: 6 }, { name: '离职', id: 7 }, { name: '临时工', id: 1 }, { name: '工人', id: 3 }]

  relation_list = [{ name: '亲人', id: 1 }, { name: '朋友', id: 2 }, { name: '其他', id: 3 }]
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
  deparment_name;
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
  bank_card_opening_bank_name;
  probation_period;
  mining_productivity;

  is_id_ok = false; // 身份证号是否正确

  id_card; // 身份证号

  now_step = 1; //操作到哪一步
  is_man = true
  is_woman = false

  ready_zhuanzheng; // 预计转正日期

  show_contact = true // 是否显示紧急联系人
  show_department = true // 是否显示岗位信息
  show_hetong = true // 是否显示合同信息
  show_caiwu = true // 是否显示财务信息
  show_fujian = true // 是否显示附件信息

  job_id; // 岗位
  jobList = [];
  jobChooseList = []
  attendance_id; // 考勤
  attendanceList = [];

  fund_start_date; // 社保起始月
  is_system_salary; // 是否系统发薪


  showInput;
  email;
  chooseOpen = false;
  chooseClose = false;
  data;

  bankList = []

  is_applicant_qr_enter = false

  constructor(public navCtrl: NavController,
    public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public datePipe: DatePipe,
    private alertCtrl: AlertController,
    public employeeService: EmployeeService, public statusBar: StatusBar) {

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

    this.employeeService.get_all_attendance({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.attendanceList = res.result.res_data
      }
    })

    this.employeeService.get_all_job({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.jobList = res.result.res_data
        this.department_value_change()
      }
    })

    this.employeeService.get_all_bank({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.bankList = res.result.res_data
      }
    })

    if (this.navParams.get('is_applicant_enter')) {
      this.now_step = 2
      this.mobile_phone = this.navParams.get('applicant_mobile_phone')
      this.name = this.navParams.get('applicant_name')
      if (this.navParams.get('applicant_gender') == 'F') {
        this.is_man = false
        this.is_woman = true
      }
      else if (this.navParams.get('applicant_gender') == 'M') {
        this.is_man = true
        this.is_woman = false
      }
      this.department_id = this.navParams.get('applicant_department_id')
      this.deparment_name = this.navParams.get('applicant_department_name')
      this.job_id = this.navParams.get('applicant_job_id')
      this.identification_id = this.navParams.get('applicant_identification_id')
    }

    if (this.navParams.get('is_applicant_qr_enter')) {
      this.is_applicant_qr_enter = true
      this.now_step = 2
      this.employeeService.get_applicant_employee_info({ 'applicant_id': this.navParams.get('applicant_id') }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.name = res.result.res_data.applicant_name
          this.identification_id = res.result.res_data.identification_id
          this.mobile_phone = res.result.res_data.mobile_phone
          this.mining_productivity = 4
          if (res.result.res_data.gender == 'F') {
            this.is_man = false
            this.is_woman = true
          } else if (res.result.res_data.gender == 'M') {
            this.is_man = true
            this.is_woman = false
          }
          // if (res.result.res_data.job_id) {
          //   this.job_id = res.result.res_data.job_id
          // }
          // if (res.result.res_data.department_id) {
          //   this.department_id = res.result.res_data.department_id
          //   this.deparment_name = res.result.res_data.department
          // }
        } else {
          this.navCtrl.pop()
        }
      })
    }

  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
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

    if (this.navParams.get('need_update_bank') == true) {
      this.bank_card_opening_bank = this.navParams.data.bank_card_opening_bank
      this.bank_card_opening_bank_name = this.navParams.data.bank_card_opening_bank_name
      this.navParams.data.need_update_bank = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_update_department') == true) {
      this.deparment_name = this.navParams.get('department_name')
      this.department_id = this.navParams.get('department_id')
      this.click_job()
      this.navParams.data.need_update_department = false;
    }
  }

  panEvent($event) {
    cordova.plugins.Keyboard.close();
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
      let d = moment(this.entry_date, "YYYY-MM-DD");
      let endDate;
      if (this.probation_period == "half_month") {
        endDate = d.add(15, "days").add(-1, 'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "one_month") {
        endDate = d.add(1, "months").add(-1, 'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "two_month") {
        endDate = d.add(2, "months").add(-1, 'days').format("YYYY-MM-DD")
      } else if (this.probation_period == "three_month") {
        endDate = d.add(3, "months").add(-1, 'days').format("YYYY-MM-DD")
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
    if (this.now_step == 1) {
      if (!this.id_card) {
        this.now_step = 0
        this.navCtrl.pop()
        return;
      }
    }
    if (this.now_step == 3) {
      if (!this.email) {
        this.now_step -= 1
        setTimeout(() => {
          this.content_step2.resize()
        }, 2)
        return;
      }
    }
    this.alertCtrl.create({
      title: '提示',
      subTitle: '是否确认返回？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          if (this.now_step == 1) {
            this.navCtrl.pop()
          }
          else if (this.now_step == 2) {
            if (this.is_applicant_qr_enter) {
              this.navCtrl.pop()
            } else {
              this.now_step = 1
              setTimeout(() => {
                this.content_step1.resize()
              }, 2)
            }

          }
          else if (this.now_step == 3) {
            this.now_step = 2
            setTimeout(() => {
              this.content_step2.resize()
            }, 2)
          }
        }
      }
      ]
    }).present();
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
      mString = mString + "   请输入手机号码"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.department_id) {
      mString = mString + "   请选择部门"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.mining_productivity) {
      mString = mString + "   请选择用工形式"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.entry_date) {
      mString = mString + "   请选择入职日期"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }

    if (!this.isShenFenCode(this.identification_id)) {
      mString = mString + "   请输入正确的身份证号码"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }

    if (!this.isTelCode(this.emergency_contact_way)) {
      mString = mString + "   请输入正确的紧急联系人的联系方式"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.isTelCode(this.mobile_phone)) {
      mString = mString + "   请输入正确的手机号码"
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
      mining_productivity: this.mining_productivity,
    }
    this.navCtrl.push('CreateAccountPage', { data: data })

  }

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeletePicturePage", { item: item, AddEmployeePage: "AddEmployeePage" })
  }

  isTelCode(str) {
    var reg = /^[1][0-9]{10}$/;
    return reg.test(str);
  }

  isShenFenCode(str) {
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return reg.test(str);
  }

  get_now_title() {
    var title_str = ''
    if (this.now_step == 1) {
      title_str = "身份验证"
    }
    else if (this.now_step == 2) {
      title_str = "录入信息"
    }
    else if (this.now_step == 3) {
      title_str = "设置账号"
    }
    else if (this.now_step == 4) {
      title_str = "完成"
    }
    return title_str
  }

  choose_man() {
    this.is_man = !this.is_man
  }

  choose_woman() {
    this.is_man = !this.is_man
  }

  changeContact() {
    this.show_contact = !this.show_contact
  }

  changeDepartment() {
    this.show_department = !this.show_department
  }

  changeHT() {
    this.show_hetong = !this.show_hetong
  }

  changeCW() {
    this.show_caiwu = !this.show_caiwu
  }

  changeFJ() {
    this.show_fujian = !this.show_fujian
  }

  step_on() {
    // 第一步输入身份证号
    if (this.now_step == 1) {
      if (!this.isShenFenCode(this.id_card)) {
        Utils.toastButtom("请输入新员工身份证号", this.toastCtrl)
        return;
      }
      this.employeeService.search_id_exist({ 'id_card': this.id_card }).then(res => {
        if (res.result.res_code == 1) {
          this.now_step += 1
          if (res.result.res_data) {
            this.mobile_phone = res.result.res_data.phone
            if (res.result.res_data.gender == 'F') {
              this.is_man = false
              this.is_woman = true
            }
            else if (res.result.res_data.gender == 'M') {
              this.is_man = true
              this.is_woman = false
            }
          }
          else {
            this.empty_all_data()
          }
          this.identification_id = this.id_card
          setTimeout(() => {
            this.content_step2.resize()
          }, 2)
        }
      })

    }
    else {
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
        mString = mString + "   请输入手机号码"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (!this.department_id) {
        mString = mString + "   请选择部门"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (!this.job_id) {
        mString = mString + "   请选择岗位"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (!this.mining_productivity) {
        mString = mString + "   请选择用工形式"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (!this.entry_date) {
        mString = mString + "   请选择入职日期"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }

      if (!this.isShenFenCode(this.identification_id)) {
        mString = mString + "   请输入正确的身份证号码"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }

      if (!this.isTelCode(this.emergency_contact_way)) {
        mString = mString + "   请输入正确的紧急联系人的联系方式"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (!this.isTelCode(this.mobile_phone)) {
        mString = mString + "   请输入正确的手机号码"
        Utils.toastButtom(mString, this.toastCtrl)
        return;
      }
      if (this.is_system_salary) {
        if (!this.bank_card_num) {
          mString = mString + "   从系统发薪资，请填写银行卡号"
          Utils.toastButtom(mString, this.toastCtrl)
          return;
        }
        if (!this.fund_start_date) {
          mString = mString + "   从系统发薪资，请填写社保起始月"
          Utils.toastButtom(mString, this.toastCtrl)
          return;
        }
      }
      this.now_step += 1
      setTimeout(() => {
        this.content_step3.resize()
      }, 2)
    }


  }
  complete() {
    if (this.chooseOpen) {
      if (!this.email) {
        Utils.toastButtom("请填写邮箱", this.toastCtrl)
        return;
      }
    }
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
      mining_productivity: this.mining_productivity,
      job_id: this.job_id,
      is_system_salary: this.is_system_salary,
      ready_zhuanzheng: this.ready_zhuanzheng,
      fund_start_date: this.fund_start_date,
      attendance_id: this.attendance_id,
      is_man: this.is_man,
      is_applicant_qr_enter: this.is_applicant_qr_enter
    }
    if (this.email) {
      data['email'] = this.email
    }
    this.employeeService.create_employee(data).then(res => {
      if (res.result.res_code == 1) {
        if (this.is_applicant_qr_enter) {
          this.navCtrl.pop()
          Utils.toastButtom( '创建成功', this.toastCtrl)
          return;
        }
        this.now_step += 1
        this.content_step4.resize()
        // this.alertCtrl.create({
        //   title: '提示',
        //   subTitle: '创建成功，是否继续创建？',
        //   buttons: [{
        //     text: '退出', handler: () => {
        //       this.navCtrl.pop()
        //     }
        //   },
        //   {
        //     text: '确定',
        //     handler: () => {
        //       this.now_step = 1
        //       this.id_card = ''
        //       this.empty_all_data()
        //     }
        //   }
        //   ]
        // }).present();
      }
    })
  }

  click_job() {
    let final_arr = []
    if (this.department_id) {
      for (let i = 0; i < this.jobList.length; i++) {
        if (this.jobList[i].department_id == this.department_id) {
          final_arr.push(this.jobList[i])
        }
      }
    }
    else {
      final_arr = this.jobList
    }
    this.jobChooseList = final_arr
  }

  department_value_change() {
    let final_arr = []
    if (this.department_id) {
      for (let i = 0; i < this.jobList.length; i++) {
        if (this.jobList[i].department_id == this.department_id) {
          final_arr.push(this.jobList[i])
        }
      }
    }
    else {
      final_arr = this.jobList
    }
    this.jobChooseList = final_arr
  }

  getYinName() {
    let finalName = ""
    let name = this.name
    let firstName = pinyin.getLowerChars(name.substr(0, 1))
    let lastName = pinyin.getLowerChars(name.substr(1))
    if (this.english_name) {
      finalName = this.english_name.toLowerCase() + '.' + firstName + "@robotime.com"
    } else {
      finalName = lastName + '.' + firstName + "@robotime.com"
    }
    return finalName
  }

  checkOpen() {
    this.chooseOpen = !this.chooseOpen
    if (this.chooseOpen) {
      this.chooseClose = false
    }
  }


  checkClose() {
    this.chooseClose = !this.chooseClose
    if (this.chooseClose) {
      this.chooseOpen = false
    }

  }

  empty_all_data() {
    this.name = ''
    this.english_name = ''
    this.nation = ''
    this.gender = ''
    this.birthday = ''
    this.identification_id = ''
    this.marital = ''
    this.mobile_phone = ''
    this.department_id = ''
    this.imgPhotoPositive = ''
    this.imgPhotoNeagtive = ''
    this.imgPhotoBank = ''
    this.zhengshuImgList = []
    this.image = ''
    this.bank_card_num = ''
    this.bank_card_opening_bank = ''
    this.emergency_contact_name = ''
    this.emergency_contact_way = ''
    this.emergency_contact_relation = ''
    this.probation_period = ''
    this.mining_productivity = ''
    this.job_id = ''
    this.ready_zhuanzheng = ''
    this.fund_start_date = ''
    this.attendance_id = ''
    this.is_man = true
  }

  watch_id_change($event) {
    if (!this.isShenFenCode(this.id_card)) {
      this.is_id_ok = false
    }
    else {
      this.is_id_ok = true
    }
  }

  exit() {
    this.navCtrl.pop()
  }

  contine_create() {
    this.now_step = 1
    this.is_id_ok = false
    this.id_card = ''
    this.empty_all_data()
  }

  choose_departments() {
    this.navCtrl.push('SelectDepartmentPage', {
      page: 'AddEmployeePage',
    })
  }

  choose_bank() {
    this.navCtrl.push('SelectBankPage')
  }
}
