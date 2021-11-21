import {
    USER_AUTHORIZED,
    USER_UNAUTHORIZED,
    LOGIN_USER_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGOUT,
    REGISTER_USER_FAILURE,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_START,
    GET_USERS_SUCCESS,
    SELECT_USER,
    UPDATE_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_START,
    GET_TOP_SHILLER,
    GET_USER_COUNT,
    GET_SHILLING_RANK

} from './auth-constants'


const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    pending: false,
    creationPending: false,
    creationError: null,
    creationSuccess: false,
    users: [],
    fetchingUsers: false,
    selectedUser: {},
    updatingUser: false,
    updateUserError: null,
    updateSuccess: false,
    deletingUser: false,
    deleteUserError: null,
    topShiller: null,
    userCount: 0,
    shillingRank: null,
    loginFailure: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_UNAUTHORIZED:
            return {
                ...state,
                error: action.payload
            }
        case USER_AUTHORIZED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGIN_USER_START:
            return {
                ...state,
                pending: true,
                loginFailure: false,
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false,
                loginFailure: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                pending: false,
                isAuthenticated: true,
                loginFailure: false
            }
        case 'CLEAR_LOGIN_USER_FAILURE':
            return {
                ...state,
                loginFailure: false
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }
        case REGISTER_USER_START:
            return {
                ...state,
                creationPending: true,
                creationSuccess: false,
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                creationError: action.payload,
                creationPending: false,
                creationSuccess: false,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                creationPending: false,
                creationError: null,
                creationSuccess: true,
            }
        case "CLEAR_REGISTER_USER_SUCCESS":
            return {
                ...state,
                creationSuccess: false,
            }


        case GET_USERS_START:
            return {
                ...state,
                fetchingUsers: true
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                fetchingUsers: false
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                fetchingUsers: false,
                users: action.payload,
                selectedUser: action.payload[0]
            }
        case UPDATE_USER_START:
            return {
                ...state,
                updatingUser: true,
                updateSuccess: false,
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                updatingUser: false,
                updateUserError: action.payload,
                updateSuccess: false

            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updatingUser: false,
                updateSuccess: true,
            }
        case "CLEAR_UPDATE_USER_SUCCESS":
            return {
                ...state,
                updateSuccess: false,
            }

        case DELETE_USER_START:
            return {
                ...state,
                deletingUser: true
            }
        case DELETE_USER_FAILURE:
            return {
                ...state,
                deletingUser: false,
                deleteUserError: action.payload

            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                deletingUser: false,
            }
        case SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload,
            }
        case GET_TOP_SHILLER:
            return {
                ...state,
                topShiller: action.payload,
            }
        case GET_USER_COUNT:
            return {
                ...state,
                userCount: action.payload,
            }
        case GET_SHILLING_RANK:
            return {
                ...state,
                shillingRank: action.payload,
            }
        default:
            return state
    }

}

export default authReducer