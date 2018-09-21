import { Utils } from './../../../providers/Utils';
import { HttpService } from './../../../providers/HttpService';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailService } from './../emailService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the EmailDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-detail',
  templateUrl: 'email-detail.html',
  providers: [EmailService,File,FileTransfer,FileOpener]
})
export class EmailDetailPage {
  id;
  email_detail;
  body_html;
  subject;
  email_from;
  EmailPage;
  email_to; date; attachment_list = [];email_cc;email_bcc
  constructor(private sanitizer: DomSanitizer,
    public transfer: FileTransfer,
    public file: File,
    public fileOpener: FileOpener,
    public navCtrl: NavController, public navParams: NavParams, public emailService: EmailService) {
    this.id = this.navParams.get('id')
    this.EmailPage = Utils.getViewController("EmailPage", this.navCtrl)
    this.emailService.get_email_detail(this.id).then(res => {
      console.log(res.result.res_data)
      this.email_detail = res.result.res_data
      this.body_html = this.email_detail.body_html
      this.subject = this.email_detail.subject
      this.email_from = this.email_detail.email_from
      this.email_to = this.email_detail.email_to
      this.email_cc = this.email_detail.email_cc
      this.email_bcc = this.email_detail.email_bcc
      this.date = this.email_detail.date
      this.attachment_list = this.transAttachUrl(this.email_detail.attachment_list)
      console.log(this.attachment_list)
    })
  }


  transAttachUrl(attachment_list) {
    for (let i = 0; i < attachment_list.length; i++) {
      let icon_src = "assets/img/attach_icon/attachment_icon.jpeg"
      if (attachment_list[i].mimetype.indexOf('jpeg') > 0) {
        icon_src = "assets/img/attach_icon/jpg.png"
      } else if (attachment_list[i].mimetype.indexOf('excel') > 0) {
        icon_src = "assets/img/attach_icon/xls.png"
        // preview_str = ''
      } else if (attachment_list[i].mimetype.indexOf('png') > 0) {
        icon_src = "assets/img/attach_icon/png.png"
      } else if (attachment_list[i].mimetype.indexOf('pdf') > 0) {
        icon_src = "assets/img/attach_icon/pdf.png"
      } else if (attachment_list[i].mimetype.indexOf('video') > 0) {
        icon_src = "assets/img/attach_icon/video.png"
      } else if (attachment_list[i].mimetype.indexOf('gif') > 0) {
        icon_src = "assets/img/attach_icon/gif.png"
      }
      attachment_list[i].icon_src = icon_src
    }
    return attachment_list
  }



  assembleHTML(strHTML) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailDetailPage');
  }


  clickAttach(id, mimeType) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = HttpService.appUrl+"web/content/"+id+"?download=true";
    fileTransfer.download(url, this.file.dataDirectory + id).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.fileOpener.open(entry.nativeURL, mimeType)
        .then(() => {
          console.log('打开成功');
        })
        .catch(() => {
          console.log('打开失败');
        });
    }, (error) => {
      console.log(error)
    });
  }

  goBack(){
    this.navCtrl.pop()
  }


}
