import { reject } from 'lodash';
import {LOGIN, SIGNUP} from '../config/urls';
import {apiPost, setUserData} from "../utils/utils"




export function login(data = {}) {
  return new Promise((resolve,reject)=>{
    apiPost(LOGIN, data).then(res =>{
      setUserData(res.data);
      resolve(res);
    })
    .catch(error=>{
      reject(error);
    })
  })
  
}

export function signUp(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(SIGNUP, data).then(res=>{
      setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })
}