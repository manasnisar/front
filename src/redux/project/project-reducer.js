const SET_PROJECT = "SET_PROJECT";

const initialState = {
  project: {}
};

export const setProject = payload => dispatch => {
  dispatch({
    type: SET_PROJECT,
    payload: payload
  });
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    default:
      return state;
  }
};

export default projectReducer;
