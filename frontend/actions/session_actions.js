import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const removeSessionErrors = () => ({
  type: REMOVE_SESSION_ERRORS
});



export const signup = formUser => dispatch => (
  SessionAPIUtil.signup(formUser)
    .then(user => (dispatch(receiveCurrentUser(user))), err => (
    dispatch(receiveSessionErrors(err.responseJSON)))
  )
);

export const login = formUser => dispatch => (
  SessionAPIUtil.login(formUser)
    .then(user => (dispatch(receiveCurrentUser(user))), err => (
    dispatch(receiveSessionErrors(err.responseJSON)))
  )
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout()
    .then(user => (dispatch(logoutCurrentUser())))
);

export const clearSessionErrors = () => dispatch => (
  dispatch(removeSessionErrors())
);
