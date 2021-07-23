/**
 * XỬ LÝ HTTP
 */
 import _ from "lodash";
 import axios from "axios";
 import { GetAdminUserToken } from "./token.helper";
 import { API_URL } from "../config/_index";
 import $ from "jquery";
// import { PARAMETER_CODE_COMPANY } from "../constants/actionTypes";
 
 /**
  * send get request
  * @param url
  * @returns  ObjResponse
  */
 export async function HttpGet(url) {
   // Nprogress.start();
   const baseUrl = API_URL + url;
   try {
     const HTTP = HttpAxios();
     const response = await HTTP.get(baseUrl);
     // Nprogress.done();
     return response.data;
    //  return new ObjResponse(response);
   } catch (e) {
     // Nprogress.done();
     // eslint-disable-next-line
     console.log( "Error http:" + e );
     const response = [];
     return new ObjResponse(response);
   }
 }
 
 /**
  * send post request
  * @param url
  * @param data
  * @returns  ObjResponse
  */
 export async function HttpPost(url, data) {
   // Nprogress.start();
   const baseUrl = API_URL + url;
   try {
     const HTTP = HttpAxios();
     const response = await HTTP.post(baseUrl, data);
     // Nprogress.done();
     return response.data;
    //  return new ObjResponse(response);
   } catch (e) {
     // Nprogress.done();
     // eslint-disable-next-line
     console.log( "Error http:" + e );
     const response = [];
     return new ObjResponse(response);
   }
 }
 
 /**
  * send save request
  * @param url
  * @param data
  * @returns ObjResponse
  */
 export async function HttpPut(url, data) {
   // Nprogress.start();
   const baseUrl = API_URL + url;
   try {
     const HTTP = HttpAxios();
     const response = await HTTP.put(baseUrl, data);
     // Nprogress.done();
     return response.data;
   } catch (e) {
     // Nprogress.done();
 
     // eslint-disable-next-line
     console.log( "Error http:" + e );
     const response = [];
     return new ObjResponse(response);
   }
 }
 
 /**
  * upload request
  * @param url
  * @param formData
  * @param showProces
  * @returns {*}
  */
 export function HttpPostUploadWithJwt(url, formData) {
   // Nprogress.start();
   let d = new $.Deferred();
   formData.append("jwt", "");
   $.ajax({
     url: API_URL + url,
     type: "POST",
     data: formData,
     dataType: "JSON",
     contentType: false,
     processData: false,
     success: function(data) {
       d.resolve(data);
     },
     error: function(xhr, status, error) {
       d.reject(error);
     },
     beforeSend: function() {}
   });
   return d.promise();
 }
 
 /**
  * send delete request
  * @param url
  * @returns ObjResponse
  */
 export async function HttpDelete(url, data = {}) {
   // Nprogress.start();
   const baseUrl = API_URL + url;
   try {
     const HTTP = HttpAxios();
     let options = { data: data };
     const response = await HTTP.delete(baseUrl, options);
     return response.data;
   } catch (e) {
     // eslint-disable-next-line
     console.log( "Error http:" + e );
     const response = [];
     return new ObjResponse(response);
   }
 }
 
 let lang = '';
 
 export function SetHTTPLocale(myLang) {
   lang = myLang;
 }
 
 /**
  * gửi GET request
  * @returns {AxiosInstance}
  */
 function HttpAxios() {
   let token = null;
   if (!_.isNull(GetAdminUserToken())) {
     token = GetAdminUserToken();
   } else {
     token = !_.isNull("");
   }
   return axios.create({
     baseURL: API_URL,
     headers: {
       "Accept-Language": lang,
       token: `${token}`,
      //  connect:PARAMETER_CODE_COMPANY
     }
   });
 }
 
 /**
  * objresponse
  * @param response
  */
 export class ObjResponse {
   constructor(response) {
     this.data = [];
     this.html = "";
     this.formErrors = [];
     this.title = "Xin lỗi";
     this.message =
       "Chúng tôi thành thật xin lỗi vì sự gián đoạn này. Sự cố này đã được ghi nhận, chúng tôi sẽ gửi khắc phục nhanh nhất. Kiểm tra internet của bạn để chắc rằng PM vẫn online";
   }
 }
 