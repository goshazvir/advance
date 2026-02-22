import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';

const ACCESS_TOKEN = 'AccessToken';
const USERNAME = 'UserName';
const USER_TYPE = 'UserType';

const request = async options => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = cookie.get(ACCESS_TOKEN);

  if (token) {
    headers['Authorization'] = token;
  }

  const response = await fetch(options.url, {
    headers: headers,
    method: options.method,
    body: JSON.stringify(options.body),
  });

  const json = await response.json();

  return json;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//                            AUTHENTICATION
////////////////////////////////////////////////////////////////////////////////////////////////////

export function signup(signupRequest) {
  return request({
    url: process.env.NEXT_PUBLIC_API_URL + '/auth/signup',
    method: 'POST',
    body: signupRequest,
  });
}

export function login(loginRequest) {
  return request({
    url: process.env.NEXT_PUBLIC_API_URL + '/auth/login',
    method: 'POST',
    body: loginRequest,
  });
}

export function logout() {
  cookie.remove(ACCESS_TOKEN);
  cookie.remove(USERNAME);

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
}

export function resendVerification(email) {
  return request({
    url: process.env.NEXT_PUBLIC_API_URL + '/auth/resendVerification/' + email,
    method: 'GET',
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//                            AUTHENTICATION - COOKIES
////////////////////////////////////////////////////////////////////////////////////////////////////

export const storeToken = token => {
  cookie.set(ACCESS_TOKEN, token, {expires: 100});
};

export const storeUserName = email => {
  const username = email.split('@')[0];

  cookie.set(USERNAME, username, {expires: 100});
};

export function storeUserType(type) {
  cookie.set(USER_TYPE, type, {expires: 100});
}
