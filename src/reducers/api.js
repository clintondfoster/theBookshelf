import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const CREDENTIALS = "credentials";

export const storeApi = createApi({
  tagTypes: ["books"],
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      console.log("prepareHeaders is running");

      const credentials = window.sessionStorage.getItem(CREDENTIALS);
      const parsedCredentials = JSON.parse(credentials || "{}");
      const token = parsedCredentials.token;
      console.log("token from reducer", token);
      if (token) {
        headers.set("Authorization", token);
      }
      console.log("token from session storage:", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "api/books",
    }),
    getBookById: builder.query({
      query: (id) => `api/books/${id}`,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `api/books/${id}`,
        method: "DELETE",
      }),
    }),
    addBook: builder.mutation({
      query: (body) => ({
        url: "api/books",
        method: "POST",
        body: body,
      }),
    }),
    editBook: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `api/books/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    //addBookToCart etc
    // (!token) do function, just in local storage
    // (token) run function, auth to verify user, then go to cart

    getUsers: builder.query({
      query: () => "api/users",
    }),
    getUserById: builder.query({
      query: (id) => `api/users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/${id}`,
        method: "DELETE",
      }),
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: "api/users",
        method: "POST",
        body: body,
      }),
    }),
    editUser: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `api/users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    // order products
    getOrderProduct: builder.query({
      query: () => "api/orderproduct",
    }),
    createOrderProduct: builder.mutation({
      query: (body) => ({
        url: "api/orderproduct",
        method: "POST",
        body: body,
      }),
    }),
    deleteOrderProduct: builder.mutation({
      query: (id) => ({
        url: `api/orderproduct/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrderProduct: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `api/orderproduct/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    // order endpoints (create, get all, get single order)
    getOrder: builder.query({
      query: () => "api/order",
    }),
    getOrderById: builder.query({
      query: (id) => `api/order/${id}`,
    }),
    createOrder: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: "api/order/submit",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

//add slice

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      storeApi.endpoints.createOrderProduct.matchFulfilled,
      (state, { payload }) => {
        return [...state, payload.addedToCart];
      }
    ),
    builder.addMatcher(
      storeApi.endpoints.deleteOrderProduct.matchFulfilled,
      (state, { payload }) => {
        return [...payload.deletedOrderProduct]
      }
    ),
    builder.addMatcher(
      storeApi.endpoints.getOrderProduct.matchFulfilled,
      (state, { payload }) => {
        return [...payload.cart];
      }
    );
    // builder.addMatcher(storeApi.endpoints.register.matchFulfilled, storeToken);
    // builder.addMatcher(storeApi.endpoints.logout.matchFulfilled, (state) => {
    //   // console.log("logout")
    //   state.credentials = {
    //     token: "",
    //     user: { userId: null },
    //   };
    //   window.sessionStorage.removeItem(CREDENTIALS);
    // });
  },
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useEditBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetOrderProductQuery,
  useCreateOrderProductMutation,
  useDeleteOrderProductMutation,
  useUpdateOrderProductMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderQuery
} = storeApi;

export default cartSlice.reducer;
