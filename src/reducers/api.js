import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
    tagTypes: ["books"],
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
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
    }),
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
} = storeApi
