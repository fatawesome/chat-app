import axios from 'axios';

export const CREATE_WORKSPACE_SUCCESS = "CREATE_WORKSPACE_SUCCESS";
export const CREATE_WORKSPACE_FAILD = "CREATE_WORKSPACE_FAILD";
export const SELECTED_WORKSPACE = "SELECTED_WORKSPACE";

export function createWorkSpace(workspace) {
  return (dispatch, getState, retry = true) => {
    axios.post(`${window.location.origin}/createworkspace`, workspace)
      .then(function (response) {
        if (response.data.error) {
          let error = response.data.error;
          dispatch({ type: CREATE_WORKSPACE_FAILD, error });
        } else {
          let data = response.data;
          dispatch({ type: CREATE_WORKSPACE_SUCCESS, data });
        }
      })
      .catch(function (error) {
        dispatch({ type: SIGN_UP_FAILD, error });
      });
  }
}

export function selectWorkSpace(workspace) {
  return (dispatch, getState) => {
    dispatch({ type: SELECTED_WORKSPACE, workspace });
  }
}