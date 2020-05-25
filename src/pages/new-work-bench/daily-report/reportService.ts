import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ReportService {
    constructor(private httpservice: HttpService) {

    }
    check_draft_daily(body){
        return this.httpservice.postBody("check_draft_daily",body)
    }

    delete_attachment(body){
        return this.httpservice.postBodyNoLoading("delete_attachment",body)
    }

    get_daily_report_last(body){
        return this.httpservice.postBody("get_daily_report_last",body)
    }

    get_team_department_tree(body){
        return this.httpservice.postBody("get_team_department_tree",body)
    }

    get_team_daily_report_new(body){
        return this.httpservice.postBody("get_team_daily_report_new",body)
    }

    get_team_daily_report_new_noloading(body){
        return this.httpservice.postBodyNoLoading("get_team_daily_report_new",body)
    }

    get_employees_reports(body){
        return this.httpservice.postBody("get_employees_reports",body)
    }

    get_all_department(body){
        return this.httpservice.postBody("get_all_department_tree",body)
    }

    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department",body)
    }

    get_is_department_new(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department_new",body)
    }

    send_submit_report(body){
        return this.httpservice.postBodyNoLoading("send_submit_report",body)
    }

    // send_submit_report_no_l(body){
    //     return this.httpservice.postBody("send_submit_report",body)
    // }

    delete_report(body){
        return this.httpservice.postBody("delete_report",body)
    }

    search_report_by_domain(body){
        return this.httpservice.postBody("search_report_by_domain",body)
    }

    upload_img_server(body){
        return this.httpservice.postBody("upload_img_server",body)
    }

    submit_report(body){
        return this.httpservice.postBody("submit_report",body)
    }

    update_zan(body){
        return this.httpservice.postBody("update_zan",body)
    }

    get_report_detail(body){
        return this.httpservice.postBodyNoLoading("get_report_detail",body)
    }

    exchange_attachment_url(body){
        return this.httpservice.postBodyNoLoading("exchange_attachment_url",body) 
    }

    get_me_daily_report(body){
        return this.httpservice.postBodyNoLoading("get_me_daily_report",body) 
    }

    get_team_daily_report(body){
        return this.httpservice.postBodyNoLoading("get_team_daily_report",body)
    }

    get_employee_report_limit(body) {
        return this.httpservice.postBody("get_employee_report_limit",body)
    }
}