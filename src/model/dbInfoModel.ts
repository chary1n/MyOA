export class dbBean {
  'res_data': string;
  'res_msg': string;
  'res_code': number;
  constructor(res_data: string, res_msg: string, res_code: number) {
    this.res_data = res_data;
    this.res_msg = res_msg;
    this.res_code = res_code;
  }
}