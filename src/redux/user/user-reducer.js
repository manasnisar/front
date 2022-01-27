const SET_USER = "SET_USER";

const initialState = {
  user: {}
};

export const setUser = payload => dispatch => {
  console.log(payload);
  dispatch({
    type: SET_USER,
    payload: payload
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
