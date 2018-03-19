import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class EditInformationService {
    constructor(private httpService: HttpService) {

    }

    pushHeardImage(imageBase64){
        let body=JSON.stringify({
            img: imageBase64,
            uid :HttpService.user_id
        })
        return this.httpService.postBody('change_img',body,1);
    }


    pushHeardImageWithUid(imageBase64,uid){
        let body=JSON.stringify({
            img: imageBase64,
            uid :uid
        })
        return this.httpService.postBodyNoLoading('change_img',body,1);
    }

}