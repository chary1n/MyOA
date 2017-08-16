import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName,ContactFindOptions ,ContactFieldType,} from '@ionic-native/contacts';
import { pinyin } from './pinyin';  
/**
 * Generated class for the CamCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cam-card',
  templateUrl: 'cam-card.html',
  providers:[Contacts],
})
export class CamCardPage {
  nameList:any = [];
  titleList:any;
  formatContacts:any = [];
  allSearchContacts = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts) {
    let options = new ContactFindOptions();  
      let fields: ContactFieldType[];  
      fields = ["displayName", "phoneNumbers"];  
      options.filter = "";  
      options.multiple = true;  
      options.hasPhoneNumber = true;    
      
      this.contacts.find(fields, options).then((result) => {  
        for (var contact of result) {
          // if (contact.organizations)
          // {
            this.nameList.push(contact);
          // }
        }
        this.dealWithList(this.nameList);
      });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamCardPage');
  }

   dealWithList(contacts) {  
    // console.log('Found contacts length==' + contacts.length);  
    // console.log('all contacts==' + JSON.stringify(contacts));  
    let contactsLength = contacts.length;  
    //显示的名称，Android ios不同  
    let isAndroid = true;  
    for (let i = 0; i < contactsLength; i++) {  
      
      if (contacts[i].phoneNumbers == null) {  
        
        continue;  
      }  
      // alert(contacts[i].phoneNumbers)
      let obj = {  
        displayName: '',  
        phoneNumber: '',  
        pinyinName: ''  
      };  
  
      // if (isAndroid) {  
      //   if (contacts[i]._objectInstance.displayName != null) {  
      //     obj.displayName = contacts[i]._objectInstance.displayName;  
      //   } else if (contacts[i]._objectInstance.name != null && contacts[i]._objectInstance.name.formatted != null) {  
      //     obj.displayName = contacts[i]._objectInstance.name.formatted;  
      //   }  
      // } else {  66666
        if (contacts[i].name.formatted != null) {  
          obj.displayName = contacts[i].name.formatted; 
          // alert(contacts[i].name.formatted); 
        } else if (contacts[i].name.familyName != null) {  
          obj.displayName = contacts[i].name.familyName;  
        } else {  
          obj.displayName = contacts[i].name.givenName;  
        }  
        if (contacts[i].name != null && contacts[i].name.formatted != null) {  
          obj.displayName = contacts[i].name.formatted;  
        }  
      // }  
  
      //去掉名称非汉字，英文的        
      let reg = /^[A-Za-z]+$/;  
      //名字为空或非字母，加到最后一组  
      obj.phoneNumber = contacts[i].phoneNumbers[0].value;  
      //有名字  
      // console.log('one contact==' + i + '  ' + JSON.stringify(obj));  
      obj.pinyinName = pinyin.getFullChars(obj.displayName);  
      // console.log('one contact getFullChars ' + i);  
  
      if (!reg.test(obj.pinyinName) || obj.displayName == '') {  
        // console.log('非正常联系人信息 名字不对==' + JSON.stringify(obj));  
  
        let len = this.formatContacts.length;  
        for (let j = 0; j < len; j++) {  
          // console.log("ffff");  
          if ((this.formatContacts[j] as any).key == 'Z') {  
            (this.formatContacts[j] as any).value.push(obj);  
            break;  
          }  
        }  
      } else {  
        //不排序，供搜索使用的数组  
        this.allSearchContacts.push(obj);  
        let camelChar = pinyin.getCamelChars(obj.displayName).substring(0, 1);  
        if (reg.test(camelChar)) {  
          let j = 0;  
          let len = this.formatContacts.length;  
          for (j; j < len; j++) {  
            // console.log("ffff");  
            if ((this.formatContacts[j] as any).key.toUpperCase() == camelChar.toUpperCase()) {  
              (this.formatContacts[j] as any).value.push(obj);  
              break;  
            }  
          }  
          if (j == len) {  
            // console.log('新增key');  
            let arr = new Array();  
            arr.push(obj);  
            this.formatContacts[len] = {  
              key: camelChar,  
              value: arr  
            };  
          }  
        }  
      }  
      // console.log('obj format==' + JSON.stringify(obj));  
      obj = null;  
    }  
  
    this.formatContacts = this.sortContacts(this.formatContacts);  
    // context.loader.dismiss();  
    // alert(this.formatContacts);
   
    console.log('this.allSearchContacts==' + this.allSearchContacts.length);  
  
  }

  sortContacts(formatContacts) {  
    // let arr = [{ key: 'S', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'Z', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'N', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'D', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'B', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'A', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }];  
  
    //首字母排序  
    formatContacts.sort(function (a, b) {  
      if (a.key.toUpperCase() < b.key.toUpperCase()) {  
        return -1;  
      } else if (a.key.toUpperCase() > b.key.toUpperCase()) {  
        return 1;  
      } else {  
        return 0;  
      }  
    });  
  
    //每组内部排序  
    for (let i = 0; i < formatContacts.length; i++) {  
      formatContacts[i].value.sort(function (a, b) {  
        if (a.key.toUpperCase() < b.key.toUpperCase()) {  
          return -1;  
        } else if (a.key.toUpperCase() > b.key.toUpperCase()) {  
          return 1;  
        } else {  
          return 0;  
        }  
      });  
    }  
    return formatContacts;  
  
  }  

}
