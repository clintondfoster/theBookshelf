import { createSlice } from "@reduxjs/toolkit";
import { storeApi } from "./api";


//session storage key
const CREDENTIALS = "credentials";

const authApi = storeApi.injectEndpoints({
    
    
    endpoints: (builder) => ({
        me: builder.query({ 
            query: () => "auth/me",
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
    console.log('storeToken is running')
    state.credentials = { token: payload.token };
    console.log("Token recieved:", payload.token);
    window.sessionStorage.setItem(
        CREDENTIALS,
        JSON.stringify(payload)
    )
}

// let storedToken = ""; // Define the variable outside the component

// function storeToken(state, { payload }) {
//   state.credentials = { token: payload.token };
//   storedToken = payload.token; // Store the token in a variable
// }


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
        builder.addMatcher(storeApi.endpoints.logout.matchRejected, (state) => {
            // console.log("logout")
            state.credentials = {
                token: '',
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

