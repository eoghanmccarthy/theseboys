import produce from "immer";

export const RESET_STORE = "RESET_STORE";
const AUTH_FETCH_CONFIG = "auth/FETCH_CONFIG";
const AUTH_FETCH_CONFIG_SUCCESS = "auth/FETCH_CONFIG_SUCCESS";
const AUTH_FETCH_CONFIG_ERROR = "auth/FETCH_CONFIG_ERROR";
const AUTH_FETCH_CONFIG_CANCEL = "auth/FETCH_CONFIG_CANCEL";

const initialState = {
  isFetching: false,
  isLoaded: false,
  error: "",
  data: {}
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_FETCH_CONFIG:
        draft.isFetching = true;
        draft.error = "";
        return;
      case AUTH_FETCH_CONFIG_SUCCESS:
        draft.isFetching = false;
        draft.isLoaded = true;
        draft.data = action.payload;
        return;
      case AUTH_FETCH_CONFIG_ERROR:
        draft.isFetching = false;
        draft.error = action.error.message;
        return;
    }
  });

export default reducer;

export const fetchAuthConfig = () => {
  return {
    type: AUTH_FETCH_CONFIG
  };
};

export const fetchAuthConfigSuccess = payload => {
  return {
    type: AUTH_FETCH_CONFIG_SUCCESS,
    payload
  };
};

export const fetchAuthConfigError = error => {
  return {
    type: AUTH_FETCH_CONFIG_ERROR,
    error
  };
};

export const fetchAuthConfigCancel = () => {
  return {
    type: AUTH_FETCH_CONFIG_CANCEL
  };
};
