import React from 'react'

function CartItemLS({onClickFunc}) {
  return (
    <div>
    <h2>Title:{book.title}</h2>
    <h2>Quantity: {book.quantity}</h2>
    <h2>Price: ¥{book.price}</h2>
    <button onClick={() => onClickFunc}>Remove Item</button>
  </div>
  )
}

export default CartItemLS