export class StockTransfer{ 
    'name':string;
    'min_date':string;
    'parnter_id':string;
    'origin':string; 
    'back_order_id':string;
    // pack_operation_product_ids:Array
    constructor(name:string,min_date:string,parnter_id:string,origin:string,back_order_id:string)
    { 
        this.name = name; 
        this.min_date = min_date; 
        this.parnter_id = parnter_id; 
        this.origin = origin;
        this.back_order_id = back_order_id;
    } 
}
