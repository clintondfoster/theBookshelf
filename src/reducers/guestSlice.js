import { createSlice } from "@reduxjs/toolkit";


 const guestCartSlice = createSlice({
    name: 'guest cart', 
    initialState: [], 
    reducers: {
        addToGuestCart: (state, action)=> {
            state.push(action.payload)

        }, 
        removeFromGuestCart: (state, action)=> {
            state.splice(action.payload, 1)
        }
    }
 })

 export const {addToGuestCart, removeFromGuestCart} = guestCartSlice.actions 

 export default guestCartSlice.reducer