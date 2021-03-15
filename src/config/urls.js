const API_BASE_URL = 'http://192.168.99.194:8002';
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;
export const LOGIN = getApiUrl('/user/loginUser');
export const SIGNUP = getApiUrl('/user/registerUser');
export const UPLOAD_IMAGE = getApiUrl('/common/uploadFile')
