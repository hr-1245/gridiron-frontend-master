/**
 * Check Development Mode
 */
const IS_LIVE = process.env.NEXT_PUBLIC_IS_LIVE;
/**
 * Production URL
 */
const LIVE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
/**
 * Development URL
 */

// const LOCAL_URL = "http://localhost:8080";
const LOCAL_URL = "http://192.168.0.102:8080";
/**
 * Base URL that will be treated as global start-point.
 */
export let BASE_URL = IS_LIVE == 'true' ? LIVE_URL : LOCAL_URL;

const URL = {

  //#region AUTHENTICATION

  AUTH_LOGIN: `${BASE_URL}/auth/signin`,
  AUTH_REGISTER_INITIATE: `${BASE_URL}/auth/signup/initiate`,
  AUTH_REGISTER: `${BASE_URL}/auth/signup`,
  AUTH_FORGET_PASSWORD: `${BASE_URL}/auth/forgot/password`,
  AUTH_VERIFY_EMAIL: `${BASE_URL}/auth/verify/email`,
  AUTH_RESET_PASSWORD: `${BASE_URL}/auth/reset/password`,
  
  //#endregion


  //#region PLAYERS

  GET_POSITIONS_DROPDOWN: `${BASE_URL}/Conversion/Player/dropdown`,
  CONVERT_PLAYER_MANUALLY: `${BASE_URL}/Conversion/Player/convert/manually`,
  CONVERT_PLAYER_AI: `${BASE_URL}/Conversion/Player/convert/AI`,
  GET_PLAYER_BY_ID: (id: string) => `${BASE_URL}/players/players/${id}`,
  GET_ALL_CONVERTED_PLAYERS: (page: number, limit: number, query?: string) => {
    let url = `${BASE_URL}/players/getAll/converted/players`;
    if (limit) url += `?limit=${limit}`;
    if (query) url += `&searchValue=${query}`;
    if (page) url += `&pageNumber=${page}`;
    return url;
  },
  GET_ALL_DRAFT_PLAYERS: (query?: string) => {
    let url = `${BASE_URL}/players/draft-folders`;
    if (query) url += `?searchName=${query}`;
    return url;
  },

  GET_DRAFT_FOLDERS_DROPDOWN: `${BASE_URL}/Conversion/Player/dropdown/draft-folders`,

  GET_DRAFT_FOLDER_BY_ID: (id?: number) => `${BASE_URL}/players/draft-folders/getById/${id}`,

  DELETE_PLAYER: (id: number) => `${BASE_URL}/players/players/${id}`,

  UPDATE_PLAYER : (id:number) => `${BASE_URL}/Conversion/Player/edit/${id}`,



  //#endregion

  //#region USERS

  ATTACH_PAYMENT_METHOD: `${BASE_URL}/stripe/attach-payment-method`,
  SUBSCRIBE_TO_PLAN: `${BASE_URL}/stripe/subscribe`,
  CANCEL_SUBSCRIPTION: `${BASE_URL}/stripe/cancel-subscription`,

  GET_DROPDOWN: `${BASE_URL}/users/dropdown`,
  UPLOAD_PROFILE_PICTURE: `${BASE_URL}/players/upload/profile-picture`,
  UPDATE_PROFILE:`${BASE_URL}/players/update-profile`,
  CHANGE_PASSWORD: `${BASE_URL}/users/change-password`,
  GET_CONSULTANT_AVAILABILITY: (id: number, date: string) => `${BASE_URL}/users/${id}/availability?date=${date}`,

  GET_ALL_USERS: (page: number, limit: number, query?: string) => {
    let url = `${BASE_URL}/users`;
    if (limit) url += `?limit=${limit}`;
    if (query) url += `&query=${query}`;
    if (page) url += `&pageNumber=${page}`;
    return url;
  },

  //#endregion



};

export default URL;

