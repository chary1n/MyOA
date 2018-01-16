import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonUseServices {
    constructor(private httpservice: HttpService) {

    }
    getApplyList(moffset, mlimit, id) {
        id =  parseInt(id)
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    }

    getApplyListNoLoading(moffset, mlimit, id) {
        id =  parseInt(id)
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_applylist", body);
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

     // 提交审核
     submit_apply( id, userId) {
        let body = JSON.stringify({
            id: id,
            user_id: userId
        });
        return this.httpservice.postBody("submit_apply", body);
    }


    // 创建审批单草稿
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

    get_shengou_item(employee_id){
        let body = JSON.stringify({
            employee_id: employee_id
        });
        return this.httpservice.postBody("get_shengou_item", body);
    }


    // 暂支
    get_zanzhi_list(id,limit,offset,type){
        let body = JSON.stringify({
            user_id:id,
            limit :limit,
            offset:offset,
            type :type 
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    }

    get_zanzhi_listNoLoading(id,limit,offset,type){
        let body = JSON.stringify({
            user_id:id,
            limit :limit,
            offset:offset,
            type :type 
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    }

    searchZanzhiList(id,type,data,text){
        let body = JSON.stringify({
            user_id:id,
            type :type ,
            data :data ,
            text:text 
        });
        return this.httpservice.postBody("search_zanzhi_list", body);
    }



    confirm(sheet_id,user_id ,title,type){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason :title,
            type :type
        });
       return this.httpservice.postBody("confirm_zanzhi",body);
    }

    refuse(sheet_id,reason,user_id)
    {
        let body = JSON.stringify({
            sheet_id:sheet_id,
            reason:reason,
            user_id:user_id,
        });
       return this.httpservice.postBody("refuse_zanzhi",body);
    }


    get_zanzhi_reminding(){
        let body = JSON.stringify({
            uid:HttpService.user_id,
        });
       return this.httpservice.postBody("get_zanzhi_reminding",body);
    }



    save_zanzhi(amount,remark,submit){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            amount:amount,
            remark:remark,
            submit:submit
        });
       return this.httpservice.postBody("create_zanzhi",body);
    }

    save_edit_zanzhi(amount,remark,submit,id){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            amount:amount,
            remark:remark,
            submit:submit,
            order_id:id
        });
       return this.httpservice.postBody("save_edit_zanzhi",body);
    }


    submitOrder(id){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            id:id
        });
       return this.httpservice.postBody("submit_order",body);
    }


    callbackOrder(description,id){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            id:id,
            description:description
        });
       return this.httpservice.postBody("callback_order",body);
    }


    get_apply_count(id){
        let body = JSON.stringify({
            user_id:id,
        });
        return this.httpservice.postBodyNoLoading("get_apply_count", body);
    }


    get_shengou_count(id){
        let body = JSON.stringify({
            user_id:id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    }

    get_all_need_do(user_id,is_plus,isShowKucun){
        let body = JSON.stringify({
            user_id:user_id,
            is_plus:is_plus,
            is_kucun:isShowKucun
        });
        return this.httpservice.postBodyNoLoading("get_all_need_do", body);
    }
}