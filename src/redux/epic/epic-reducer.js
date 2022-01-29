const SET_EPIC_TO_BE_UPDATED = "SET_EPIC_TO_BE_UPDATED";

const initialState = {
  epicToBeUpdated: ""
};

export const setEpicToBeUpdated = payload => dispatch => {
  dispatch({
    type: SET_EPIC_TO_BE_UPDATED,
    payload: payload
  });
};

const epicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EPIC_TO_BE_UPDATED:
      return {
        ...state,
        epicToBeUpdated: action.payload
      };
    default:
      return state;
  }
};

export default epicReducer;
