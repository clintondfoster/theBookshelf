import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const orderProductApi = createApi({
    tagTypes:['orderproduct'],
    reducerPath: 'orderproductApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        getOpenOrder: builder.query({
            query: (id)=> 'api/orderproduct',
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
        
    


    })




})
export const {
    useGetOpenOrderQuery,
    useCreateOrderProductMutation,
    useDeleteOrderProductMutation,
    useUpdateOrderProductMutation,


} = orderProductApi