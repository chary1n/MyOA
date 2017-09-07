import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class SalesSearvice {
    constructor(private httpservice: HttpService) {

    }
    getQuotesList(moffset, mlimit, id) {
        let body = JSON.stringify({
            type: 'in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesOrder(moffset, mlimit, id) {
        let body = JSON.stringify({
            type: 'not in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesReturn(moffset, mlimit, id) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesOrderDetail(mid) {
        let body = JSON.stringify({
            id: mid
        });
        return this.httpservice.postBody("get_sale_orders_details", body);
    }
    getSalesReturnOrderDetail(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_sale_return_details", body);
    }


    searchQuotesList(number,id) {
        let body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "draft",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

    searchSalesList(number,id) {
        let body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "purchase",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

    searchSalesReturnList(number,id) {
        let body = JSON.stringify({
            name: number,
            model: "return.goods",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

    cancelOrder(mid) {
        let body = JSON.stringify({
            id: mid,
        });
        return this.httpservice.postBody("cancel_order", body);
    }



    confirmOrder(mid) {
        let body = JSON.stringify({
            id: mid,
        });
        return this.httpservice.postBody("confirm_order", body);
    }

    // 获取产品列表
    getProducts(moffset, mlimit) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
        });
        return this.httpservice.postBody("get_products", body);
    }

    searchProduction(mName) {
        let body = JSON.stringify({
            name: mName
        });
        return this.httpservice.postBody("get_products", body);
    }

    searchProductionByScan(mName) {
        let body = JSON.stringify({
            name: mName
        });
        return this.httpservice.postBody("search_products_by_material_no", body);
    }

    // 仓库列表
    getWareHouseList() {
        let body = JSON.stringify({
            type: "warehouse"
        });
        return this.httpservice.postBody("get_all_customers", body);
    }

    // 送货策略
    getDeliveryRulsList() {
        let body = JSON.stringify({
            type: "picking_policy"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 销售团队
    getTeamList() {
        let body = JSON.stringify({
            type: "team"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 分析账户
    getAnalyticAccountList() {
        let body = JSON.stringify({
            type: "analytic_account"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 获取贸易术语
    getIncotermList() {
        let body = JSON.stringify({
            type: "incoterm"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 获取标签
    getTagsList() {
        let body = JSON.stringify({
            type: "tags"
        });
        return this.httpservice.postBody("get_all_customers", body);
    }

    // 获取财务列表
    getFiscalList() {
        let body = JSON.stringify({
            type: "fiscal"
        });
        return this.httpservice.postBody("get_all_customers", body);
    }

    // 获取交货规则
    getDeliveryList() {
        let body = JSON.stringify({
            type: "delivery"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 获取税金列表
    getTaxList() {
        let body = JSON.stringify({
            type: "tax"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    }

    // 获取付款条款列表
    getPaymentTermList() {
        let body = JSON.stringify({
            type: "payment_term"
        });
        return this.httpservice.postBody("get_all_customers", body);
    }

    // 获取价格表
    getPriceFormList() {
        let body = JSON.stringify({
            type: "pricelist"
        });
        return this.httpservice.postBody("get_all_customers", body);
    }

    // 获取送货地址
    getDeliveryAddressList(mid) {
        let body = JSON.stringify({
            type: "delivery",
            id: mid
        });
        return this.httpservice.postBodyNoLoading("choose_customer", body);
    }

    // 获取发票地址
    getPaymentAddressList(mid) {
        let body = JSON.stringify({
            type: "invoice",
            id: mid
        });
        return this.httpservice.postBodyNoLoading("choose_customer", body);
    }

    // 创建报价单
    createSoOrder(mbody) {
        let body = JSON.stringify(mbody);
        return this.httpservice.postBody("create_so_order_draft", body);
    }

    // 获取产品详细
    getProductionDetailById(mid) {
        let body = JSON.stringify({
            id: mid
        });
        return this.httpservice.postBody("product_details", body);
    }

    // 获取产品详细
    getProductionDetailByCode(mCode) {
        let body = JSON.stringify({
            code: mCode
        });
        return this.httpservice.postBody("product_details", body);
    }


    // 设置为报价单的接口
    setToQuotes(mId){
        let body = JSON.stringify({
            id: mId
        });
        return this.httpservice.postBody("to_draft", body);

    }



}


