import React from 'react';
import './card-item.css';
import Crossimage from "../crossimage/crossimage";
import Label from './../label/label';
import ImgBlueHeart from '../imgBlueHeart/imgBlueHeart';
import {Link} from 'react-router-dom';

class CardItem extends React.Component {
  render(){
    return (
      <div className = "card-item-class">
        <ImgBlueHeart addCart={this.props.addCart} id={this.props.id}/>
        <Link to="/item" style = {{textDecoration: "none", color: "#222"}} >
          <Crossimage way = {this.props.image} />
        </Link>
        <Label className = "labelName-class" nameOfLabel = {this.props.name}/>
        <Label className = "labelDescription-class" nameOfLabel = {this.props.description}/>
        <Label className = "labelPrice-class" nameOfLabel = {this.props.cost + " руб."}/>
    </div>
  );
  }
}

export default CardItem;