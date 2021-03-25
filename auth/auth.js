import Cookies from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

const apiUrl = process.env.API_HOST;

export const authStatus = () => {
  let token = Cookies.get('jwt');
  if (token) {
    return true;
  }
  return false;
}

export const logout = () => {
  Cookies.remove('jwt');
  Router.push('/');
}