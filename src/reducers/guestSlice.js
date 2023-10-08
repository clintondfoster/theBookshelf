import { createSlice } from "@reduxjs/toolkit";


 const guestCartSlice = createSlice({
    name: 'guest cart', 
    initialState: [], 
    reducers: {
        // addToGuestCart: (state, action)=> {
        //     state.push(action.payload)

        // }, 
        addToGuestCart: (state, action) => {
            const bookToAdd = action.payload;
            const existingBook = state.find(book => book.id === bookToAdd.id);
      
            if (existingBook) {
              existingBook.quantity += bookToAdd.quantity;
            } else {
              state.push(action.payload);
            }
          },
        removeFromGuestCart: (state, action)=> {
            state.splice(action.payload, 1)
        }, 
        updateGuestCartItemQuantity: (state, action) => {
            const { bookId, quantity } = action.payload;
            const bookToUpdate = state.find((book) => book.id === bookId);
      
            if (bookToUpdate) {
              // Update the quantity of the book
              bookToUpdate.quantity = quantity;
            }
          },
    }
 })

 export const {addToGuestCart, removeFromGuestCart, updateGuestCartItemQuantity} = guestCartSlice.actions 

 export default guestCartSlice.reducer