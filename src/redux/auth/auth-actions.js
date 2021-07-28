import axios from 'axios'

import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    USER_AUTHORIZED,
    USER_UNAUTHORIZED,
    LOGOUT,
    CREATE_USER_FAILURE,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
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

const apiRoute = process.env.REACT_APP_SERVER_URL

axios.defaults.withCredentials = true;

export const isAuth = (history) => (dispatch) => {
    axios.get(apiRoute + "auth/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
        .then((res) => {
            dispatch({
                type: USER_AUTHORIZED,
                payload: res.data.user
            });
        }
        )
        .catch((err) => {
            dispatch({
                type: USER_UNAUTHORIZED
            });
        });
};

export const loginUserAsync = (post, history) => async (dispatch) => {
    dispatch({
        type: LOGIN_USER_START,
    });
    let body = {
        email: post.email,
        password: post.password
    };
    const requestPOST = axios.post(apiRoute + "auth/login", body, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    await requestPOST.then(function (response) {
        localStorage.setItem("accessToken", response.data.tokens.access.token);
        localStorage.setItem("accessTokenExpiry", response.data.tokens.access.expires);
        localStorage.setItem("refreshToken", response.data.tokens.refresh.token);
        localStorage.setItem("refreshTokenExpiry", response.data.tokens.refresh.expires);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: response.data.user
        });
        if (response.data.user.role === "admin") {
            history.push("/admin");
        } else if (response.data.user.role === "user") {
            history.push("/home");
        }
    }).catch(function (error) {
        if(error.response){
            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: error.response.data.message
            });
        }else{
            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: error.message
            });
        }

        setTimeout(() => {
            dispatch({
                type: "CLEAR_LOGIN_USER_FAILURE",
            });
        },5000)

    })
}

export const logout = (history) => async (dispatch) => {
    var post = {
        refreshToken: localStorage.getItem("refreshToken")
    };
    const requestPOST = axios.post(apiRoute + "auth/logout", post, {
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true
    });
    await requestPOST.then(function (response) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpiry");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpiry");

        dispatch({
            type: LOGOUT
        });
        history.push("/signin");

    }).catch((err) => {
        console.log(err);
    });

};

export const createUserAsync = (post) => async (dispatch) => {
    dispatch({
        type: CREATE_USER_START,
    });
    let body = {
        name: post.fullName,
        telegramId: post.telegramId,
        email: post.email,
        password: post.password,
        shillingPoints: 0,
    };
    const requestPOST = axios.post(apiRoute + "users/", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: CREATE_USER_SUCCESS,
        });
        setTimeout(() => {
            dispatch({
                type: "CLEAR_CREATE_USER_SUCCESS",
            });
        }, 6000)
    }).catch(function (error) {
        dispatch({
            type: CREATE_USER_FAILURE,
            payload: error.response.data.message
        });
    })
}


export const getUsersAsync = (post) => async (dispatch) => {
    dispatch({
        type: GET_USERS_START,
    });

    const requestPOST = axios.get(apiRoute + "users?role=user", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data.results
        });
    }).catch(function (error) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: error.response.data.message
        });
    })
}

export const getUserCount = () => async (dispatch) => {
    const requestPOST = axios.get(apiRoute + "users/count", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: GET_USER_COUNT,
            payload: response.data[0].users
        });
    })
}

export const updateUser = (post, id) => async (dispatch) => {
    dispatch({
        type: UPDATE_USER_START,
    });
    let body = {
        name: post.fullName,
        telegramId: post.telegramId,
        email: post.email,
        password: post.password,
    };
    const requestPOST = axios.patch(apiRoute + `users/${id}`, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: UPDATE_USER_SUCCESS,
        });
        setTimeout(() => {
            dispatch({
                type: "CLEAR_UPDATE_USER_SUCCESS",
            });
        }, 6000)

    }).catch(function (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.response.data.message
        });
    })
}

export const deleteUser = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_USER_START,
    });

    const requestPOST = axios.delete(apiRoute + `users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: DELETE_USER_SUCCESS,
        });
    }).catch(function (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.response.data.message
        });
    })
}

export const selectUser = (user) => (dispatch) => {
    dispatch({
        type: SELECT_USER,
        payload: user
    });
}

export const getTopShiller = () => async (dispatch) => {

    const requestPOST = axios.get(apiRoute + "users/top", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: GET_TOP_SHILLER,
            payload: response.data[0]
        });
    })
}

export const getShillingRank = (id) => async (dispatch) => {

    const requestPOST = axios.get(apiRoute + `users/${id}/rank`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    await requestPOST.then(function (response) {
        dispatch({
            type: GET_SHILLING_RANK,
            payload: response.data.rank
        });
    })
}


