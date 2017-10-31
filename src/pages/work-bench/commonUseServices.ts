import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonUseServices {
    constructor(private httpservice: HttpService) {

    }
    getApplyList(moffset, mlimit, id) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    }


    searchApplyList(id, type, data) {
        let body = JSON.stringify({
            offset: 0,
            limit: 100,
            user_id: id,
            type: type,
            data: data
        });
        return this.httpservice.postBody("get_applylist", body);
    }
    getApplyDetail(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    }

    getLeaveDetail(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_leavelist_detail", body);
    }

    getLeaveList(moffset, mlimit, id) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_leavelist", body);
    }

    //  获取暂支金额,部门,产品名
    getPaymentReminding(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    }

    // 撤回
    get_retract(descrpiction, id, userId) {
        let body = JSON.stringify({
            active_id: id,
            description: descrpiction,
            user_id: userId
        });
        return this.httpservice.postBody("get_retract", body);
    }

    // 创建审批单
    createApply(data) {
        let body = JSON.stringify(data);
        console.log("JSON 的body 是" + body)
        return this.httpservice.postBody("create_apply_order", body);
    }

    get_leaveType() {
        let body = JSON.stringify({
            limit: 10
        });
        return this.httpservice.postBody("get_leaveType", body);
    }
}