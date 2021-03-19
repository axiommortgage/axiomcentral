import nookies from 'nookies';
import Router from 'next/router';
import axios from 'axios';

const apiUrl = process.env.API_HOST;

export const authStatus = () => {
  
  let token = nookies.get('jwt');
  if(token){
    return true;
  }
  return false;
}


export const logout = () => {
  nookies.destroy('jwt');
  Router.push('/');
}