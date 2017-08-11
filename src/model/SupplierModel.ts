export class SupplierModel{ 
    'email':string;
    'name':string;
    'phone':string;
    'street':string; 
    'type':any;
    // pack_operation_product_ids:Array
    constructor(email:string,name:string,phone:string,street:string,type:any)
    { 
        this.name = name; 
        this.email = email; 
        this.phone = phone; 
        this.street = street;
        this.type = type;
    } 
}