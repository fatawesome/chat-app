import {
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_FAILD,
  SELECTED_WORKSPACE,
} from '../actions/workspace'

const INIT_STATE = {
  workspace: null,
  error: null,
}

const successful = (state, workspace) => {
  return { ...state, workspace: workspace, error: null };
}

const faild = (state, error) => {
  return { ...state, workspace: null, error: error };
}

export default function workspace(state = INIT_STATE, action) {
 
  switch (action.type) {
    case CREATE_WORKSPACE_SUCCESS:
      return successful(state, action.data);
    case CREATE_WORKSPACE_FAILD:
      return faild(state, action.error);
    case SELECTED_WORKSPACE:
      return successful(state, action.workspace);
    default:
      return state;
  }
}