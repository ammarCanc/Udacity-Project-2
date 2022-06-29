export const AUTH_USER_LOGOUT = 'LOGOUT_USER';
export const AUTH_USER_LOGIN = 'LOGIN_USER';


export function logoutUser() {
  return {
    type: AUTH_USER_LOGOUT,
  }
}

export function loginUser(id, name, path) {
    return {
      type: AUTH_USER_LOGIN,
      id,
      name,
      path,
    }
  }
