import { HttpDelete, HttpGet, HttpPost, HttpPut } from "../axios.helper";
import * as moment from "moment";
export class Api {
  resource = null;
  formatDate = "YYYY/MM/DD";
  payloadPaging = {};
  constructor(resource) {
    this.resource = resource;
    this.defaultObjectCrud();
  }
  defaultObjectCrud() {
    this.payloadPaging = {
      checkiframe: 1,
      rows: 10,
      current_page: 1,
      search: "",
      month: moment().startOf("month").format("YYYY/MM"),
      date: {
        start: moment().startOf("month").format(this.formatDate),
        end: moment().endOf("month").format(this.formatDate),
      },
      id: null,
      lang: "",
    };
  }
  /**
   * @param id
   * @return ObjResponse
   */
    async getOneUserLogin(payload = {}) {
      return HttpPost(`${this.resource}`,payload);
    }
  
  /**
   * @param payload
   * @return ObjResponse
   */
  async getPaging(customePayload = {}) {
    let payload = Object.assign(this.payloadPaging, customePayload);
    return HttpGet(`${this.resource}`, payload);
  }
  /**
   * @param payload
   * @return ObjResponse
   */
  async getAll(payload) {
    return HttpGet(`${this.resource}/all`, payload);
  }
  async getHome(payload) {
    console.log(payload);
    return HttpGet(`${this.resource}/home`, payload);
  }
//  /**
//    * @param payload
//    * @param id
//    * @return ObjResponse
//    */
//   async getAllId(id,payload) {
//     return HttpPost(`${this.resource}/${id}`, payload);
//   }
  /**
   * @param id
   * @return ObjResponse
   */
  async getOne(id) {
    return HttpGet(`${this.resource}/${id}`);
  }
 /**
   * @param payload
   * @return ObjResponse
   */
  async set(payload) {
    return HttpPost(`${this.resource}`, payload);
  }
  async delete(payload) {
    return HttpPost(`${this.resource}`, payload);
  }
  /**
   * @param payload
   * @return ObjResponse
   */
  async create(payload) {
    return HttpPost(`${this.resource}`, payload);
  }

  async addFile(payload) {
    // console.log(payload,config);
    // console.log(`${this.resource}`,{slide:'C:\fakepath\logoGlink.png'},config);
    // console.log(`${this.resource}`, payload,config);
    
    // return HttpPost(`${this.resource}`,{slide:'C:\fakepath\logoGlink.png'},config);
    return HttpPost(`${this.resource}`, payload);
  }

  /**
   * @param payload
   * @return ObjResponse
   */
  async update(payload, id) {
    return HttpPut(`${this.resource}/${id}`, payload);
  }

  /**
   * @param id
   * @return ObjResponse
   */
  // async delete(id, params = {}) {
  //   return HttpDelete(`${this.resource}/${id}`, params);
  // }

  /**
   * @return ObjResponse
   */


   async login(payload, id) {
    return HttpPost(`${this.resource}/${id}`, payload);
  }
}