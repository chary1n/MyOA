export class UrlServer{

    public static base_url :string ;


    public  static setBaseUrl(url:string){
        this.base_url = url
    }

    public static getBaseUrl(){
        return this.base_url ;
    }

}