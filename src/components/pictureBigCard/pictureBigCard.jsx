import React from 'react';
import './pictureBigCard.css';

function PictureBigCard(props) {

  return (
      <div className = "picturebigcard-class">
          <img className = "img-class-pic" src = {props.way} alt="big card product"></img>
      </div>
  );
}

export default PictureBigCard;