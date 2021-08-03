/**
 * XỬ LÝ TOKEN
 */
  // const ADMIN_USER_TOKEN_LS = "ADMIN_USER_TOKEN_LS";

  /**
   * lưu login token vào local stoarete
   * @returns {void|string}
   */
  export function GetAdminUserToken() {
    return localStorage.getItem('token');;
  }
  
  /**
   * set login token
   * @param token
   */
  export function SetAdminUserToken(token) {
      return null;
  }
  
  