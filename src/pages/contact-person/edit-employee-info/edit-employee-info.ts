import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform, ActionSheetController } from 'ionic-angular';
import { ContactService } from './../contact-persionService'
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { EmployeeService } from '../../add-employee/EmployeeService';
import { HttpService } from './../../../providers/HttpService';
import { NativeService } from './../../../providers/NativeService';
/**
 * Generated class for the EditEmployeeInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-employee-info',
  templateUrl: 'edit-employee-info.html',
  providers: [ContactService, EmployeeService, NativeService],
})
export class EditEmployeeInfoPage {
  item;
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

  bankList

  frontPage

  all_attachment_imgs = []

  show_footer = true
  constructor(public navCtrl: NavController, public navParams: NavParams, public employeeService: EmployeeService,
    public contactService: ContactService, public toast: ToastController, public actionSheetCtrl: ActionSheetController,
    public nativeService: NativeService, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController("ManagerEmployeeDetailPage", this.navCtrl)
    this.item = this.navParams.get('item')
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

    this.set_up_data()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeeInfoPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_update_department') == true) {
      this.deparment_name = this.navParams.get('department_name')
      this.department_id = this.navParams.get('department_id')
      this.click_job()
      this.navParams.data.need_update_department = false;
    }
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
      this.search_delete_origin_attachments()
    }
  }

  goBack() {
    this.show_footer = false
    this.navCtrl.pop()
  }

  set_up_data() {
    this.name = this.item.name
    this.english_name = this.item.rt_english_name
    this.image = this.item.image
    if (this.item.gender == '男') {
      this.is_man = true
      this.is_woman = false
    }
    else {
      this.is_man = false
      this.is_woman = true
    }
    this.get_marry_info(this.item.marital)
    this.mobile_phone = this.item.mobile_phone
    this.identification_id = this.item.identification_id
    this.get_identification_info(this.item.identification_id_imgs)
    this.emergency_contact_name = this.item.rt_emergency_contact_name
    this.get_emergy_relation_info(this.item.rt_emergency_contact_relation)
    this.emergency_contact_way = this.item.rt_emergency_contact_way
    this.deparment_name = this.item.department_id
    this.department_id = this.item.department_id_id
    this.attendance_id = this.item.attendance_id
    this.job_id = this.item.job_id
    this.get_work_type_info(this.item.productivity_data)
    this.entry_date = this.item.rt_date_of_entry
    this.probation_date = this.item.rt_date_of_correction
    this.bank_card_opening_bank = this.item.rt_bank_id
    this.bank_card_num = this.item.rt_acc_number
    if (this.item.rt_is_system_salary == '是') {
      this.is_system_salary = true
    }
    else {
      this.is_system_salary = false
    }
    if (this.item.rt_social_security_welfare_start_date) {
      let group_date = this.item.rt_social_security_welfare_start_date.split('-')
      this.fund_start_date = group_date[0] + "-" + group_date[1]
    }

    if (this.item.bank_card_imgs) {
      this.imgPhotoBank = this.item.bank_card_imgs[0]
    }
    this.zhengshuImgList = this.item.other_imgs

    this.all_attachment_imgs = this.item.all_attachment_imgs
  }

  get_identification_info(server_data) {
    if (server_data[0]) {
      this.imgPhotoPositive = server_data[0]
    }
    if (server_data[1]) {
      this.imgPhotoNeagtive = server_data[1]
    }
  }

  get_marry_info(server_data) {
    if (server_data == '未婚') {
      this.marital = 'S'
    }
    else if (server_data == '已婚') {
      this.marital = 'M'
    }
    else if (server_data == '离异') {
      this.marital = 'D'
    }
    else if (server_data == '丧婚') {
      this.marital = 'W'
    }
    else if (server_data == '再婚') {
      this.marital = 'R'
    }
  }

  get_emergy_relation_info(server_data) {
    if (server_data == '亲人') {
      this.emergency_contact_relation = 1
    }
    else if (server_data == '朋友') {
      this.emergency_contact_relation = 2
    }
    else if (server_data == '其他') {
      this.emergency_contact_relation = 3
    }
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

  get_work_type_info(server_data) {
    if (server_data == '临时工') {
      this.mining_productivity = 1
    }
    else if (server_data == '派遣工') {
      this.mining_productivity = 2
    }
    else if (server_data == '工人') {
      this.mining_productivity = 3
    }
    else if (server_data == '实习') {
      this.mining_productivity = 4
    }
    else if (server_data == '试用') {
      this.mining_productivity = 5
    }
    else if (server_data == '正式') {
      this.mining_productivity = 6
    }
    else if (server_data == '离职') {
      this.mining_productivity = 7
    }
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

  click_finish() {
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

    let data = {
      employee_id: this.item.id,
      uid: HttpService.user_id,
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
      all_attachment_imgs: this.all_attachment_imgs,
    }
    this.contactService.new_edit_employee(data).then(res => {
      if (res.result.res_code == 1) {
        Utils.toastButtom("操作成功", this.toast)
        this.frontPage.data.need_fresh = true
        this.show_footer = false
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

  isTelCode(str) {
    var reg = /^[1][0-9]{10}$/;
    return reg.test(str);
  }

  isShenFenCode(str) {
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return reg.test(str);
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

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeletePicturePage", { item: item, EditEmployeeInfoPage: "EditEmployeeInfoPage" })
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

  getPictureSuccess(img_url) {
    var attachment_type = 0;
    if (this.photoType == "photoZhengshu") {
      attachment_type = 3
      this.zhengshuImgList.push(img_url)
      // this.pushzhengshuImgList.push(img_url.split(",")[1])
    } else if (this.photoType == "photoPositive") {
      attachment_type = 1
      this.imgPhotoPositive = img_url
    } else if (this.photoType == "photoNeagtive") {
      attachment_type = 1
      this.imgPhotoNeagtive = img_url
    } else if (this.photoType == "photoBank") {
      attachment_type = 2
      this.imgPhotoBank = img_url
    } else if (this.photoType == "heard") {
      this.image = img_url
    }
    this.all_attachment_imgs.push({
      'create': true,
      'url': img_url,
      'type': attachment_type,
    })

  }

  search_delete_origin_attachments() {
    for (var i = 0; i < this.all_attachment_imgs.length; i++) {
      if (this.all_attachment_imgs[i].url == this.deletePicture) {
        this.all_attachment_imgs[i]['delete'] = true
      }
    }
  }

  choose_departments() {
    this.navCtrl.push('SelectDepartmentPage', {
      page: 'EditEmployeeInfoPage',
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

}
