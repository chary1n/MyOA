import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class EditInformationService {
    constructor(private httpService: HttpService) {

    }

    pushHeardImage(imageBase64){
        let body=JSON.stringify({
            img: imageBase64
        })
        return this.httpService.postBody('change_img',body,1);
    }


}