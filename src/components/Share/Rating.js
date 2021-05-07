import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
export default class Rating extends Component {
    constructor(props) {
        super(props);
    };
    thirdExample = {
        size: 35,
        count: 5,
        isHalf: false,
        value: this.props.point ? this.props.point : 5,
        color: "#92C0CA",
        edit:this.props.access?false:true,
        activeColor: "yellow",
        onChange: newValue => {
            console.log(`Example 3: new value is ${newValue}`);
    }   
  };
    render() {
        return (
            <div>
                <ReactStars {...this.thirdExample} />
            </div>
        )
    }
}
