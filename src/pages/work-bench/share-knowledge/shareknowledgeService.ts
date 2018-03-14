import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class ShareknowledgeService{
    constructor(private httpservice: HttpService) {
        
            }
    getblogList(type,limit, offset){
            let body = JSON.stringify({
                limit:limit,
                offset:offset,
                type:type,
            });
            return this.httpservice.postBody("get_blog_list",body);
    } 
    getblogCloum(){
        let body = JSON.stringify({
    
        });
        return this.httpservice.postBody("get_blog_colum", body);
    }

    //二级标签
    getblogDetailFrom(tag_id){
        let body = JSON.stringify({
            is_tag_id : true,
            is_first: false,
            tag_id : tag_id,
        });
        return this.httpservice.postBody("get_blog_list", body)
    }
    //一级标签
    getblogDetailfirst(tag_id){
        let body = JSON.stringify({
            is_tag_id : true,
            is_first: true,
            tag_id : tag_id,
        });
        return this.httpservice.postBody("get_blog_list", body)
    }
    //搜索
    getSearchList(search_type, search_body){
        let body = JSON.stringify({
            type : "search",
            search_type: search_type,
            search_body: search_body,
        });
        return this.httpservice.postBody("get_blog_list", body)
    }
}