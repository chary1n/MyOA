import {BaseRequestOptions} from "@angular/http";

export class ArRequestOptions extends BaseRequestOptions {

  private X_Auth_Token : any;

  constructor() {
    super();
    this.X_Auth_Token = localStorage.getItem("xAuthToken");
    console.log("执行到这了")
    this.headers.append('x-auth-token',this.X_Auth_Token);
  }
}
