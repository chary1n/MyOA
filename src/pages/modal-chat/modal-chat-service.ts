import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalChatService {
    constructor(private httpService: HttpService) {

    }

    reply_to(body){
        return this.httpService.postBodyNoLoading("reply_to", body);
    }
}