import React from 'react'

const Card = (props) => {
  return (
    <div className='card'>
        <div className="image-holder"> <img src={props.image} alt="profile picture" className='card-image'></img></div>
       
<h2>{props.name}</h2>
<p>{props.comment}</p>
    </div>
  )
}

export default Card