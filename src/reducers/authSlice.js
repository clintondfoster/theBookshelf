import { createSlice } from "@reduxjs/toolkit";
import { storeApi } from "./api";


//session storage key
const CREDENTIALS = "credentials";

const authApi = storeApi.injectEndpoints({
    
    
    endpoints: (builder) => ({
        me: builder.query({ 
            query: () => "/me",
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: "POST",
                body: credentials,
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: credentials,
            })
        }),
        logout: builder.mutation({
            query: () => ({data:{}}),
        })
    })
})

function storeToken(state, { payload }) {
    state.credentials = { token: payload.token };
    window.sessionStorage.setItem(
        CREDENTIALS,
        JSON.stringify({
            token: payload.token,
        })
    )
}


const initialState = {
    credentials: JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
        token: "",
        user: {userId: null},
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(storeApi.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(storeApi.endpoints.register.matchFulfilled, storeToken);
        builder.addMatcher(storeApi.endpoints.logout.matchFulfilled, (state) => {
            // console.log("logout")
            state.credentials = {
                token: '',
                user: { userId: null },
            };
            window.sessionStorage.removeItem(CREDENTIALS)
        })
    }
})

export default authSlice.reducer;

export const {
    useMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
 } = authApi;

