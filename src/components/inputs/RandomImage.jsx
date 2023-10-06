import React from 'react'

function RandomImage() {
    const randomImageId = Math.floor(Math.random() * 1000);
  return (
    <div>
      <img src={`https://picsum.photos/id/${randomImageId}/200`} alt="random image" />
    </div>
  )
}

export default RandomImage
