import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createSlice} from "@reduxjs/toolkit";


export const storeApi = createApi({
    tagTypes:['tag'],
    reducerPath: 'CartApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        getCartByUserId: builder.query({
            query: (id)=> 'api/cart/'+ id
        }),


    })




})