interface StockPickingListModel {
  jsonrpc: string;
  id?: any;
  result: Result;
}

interface Result {
  'res_data': Resdatum[];
  'res_msg': string;
  'res_code': number;
}

interface Resdatum {
  origin: string;
  'sale_note': boolean;
  'qc_img': string;
  'complete_rate': number;
  'pack_operation_product_ids': Packoperationproductid[];
  'location_id': string;
  'parnter_id': string;
  creater: string;
  'post_img': string;
  state: string;
  'picking_type_code': string;
  'has_attachment': boolean;
  'post_area_id': Areaid;
  emergency: boolean;
  'min_date': string;
  phone: string;
  name: string;
  'qc_note': string;
  'back_order_id': boolean | string;
  'tracking_number': boolean;
  'delivery_rule'?: any;
  'picking_id': number;
}

interface Packoperationproductid {
  'to_location'?: string;
  'rejects_qty'?: number;
  'product_id': Productid;
  'pack_id': number;
  'product_qty': number;
  'qty_done': number;
  'origin_qty'?: number;
}

interface Productid {
  'area_id': Areaid;
  'product_specs'?: string;
  'default_code': string;
  'qty_available': number;
  id: number;
  name: string;
}

interface Areaid {
  'area_id': null | number;
  'area_name': null | string;
}