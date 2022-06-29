import {
    AUTH_USER_LOGIN,
    AUTH_USER_LOGOUT,
  } from '../actions/authUser'
  

  export default function authUser(state = null, action) {
    switch (action.type) {
      case AUTH_USER_LOGIN :
        return {
          id: action.id,
          name: action.name,
          avatarPath: action.path
        }
      case AUTH_USER_LOGOUT :
        return null
      default :
        return state
    }
  }
  