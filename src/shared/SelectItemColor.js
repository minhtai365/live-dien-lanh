import React, { Component } from "react";

export default class SelectItemColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingColor: [
        {
          color: "rgb(217, 54, 81)",
          select: true,
        },
        {
          color: "rgb(255, 159, 26)",
        },
        {
          color: "rgb(255, 213, 0)",
        },
        {
          color: "rgb(138, 204, 71)",
        },
        {
          color: "rgb(71, 204, 138)",
        },
        {
          color: "rgb(48, 191, 191)",
        },
        {
          color: "rgb(0, 170, 255)",
        },
        {
          color: "rgb(143, 126, 230)",
        },
        {
          color: "rgb(152, 170, 179)",
        },
      ],
    };
  }
  changeColor(index) {
    this.state.settingColor.forEach((item) => {
      return (item.select = false);
    });
    this.state.settingColor[index].select = true;
    this.props.setColor(this.state.settingColor[index].color);
    this.setState({
      settingColor: this.state.settingColor,
      // color: this.state.settingColor[index].color,
    });
  }
  render() {
    return(<div className={"kr-view select-color"} style={{ display: "flex" }}>
      {this.state.settingColor.map((item, index) => {
        return (
          <div
            onClick={() => this.changeColor(index)}
            className={"kr-view"}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: this.props.mywidth||"30px",
              height: this.props.mywidth||"30px",
              cursor: "pointer",
            }}
            key={index}
          >
            <div
              className={
                this.state.settingColor[index].select
                  ? "kr-view select"
                  : "kr-view unselect"
              }
              style={{ backgroundColor: item.color }}
            ></div>
          </div>
        );
      })}
    </div>);
  }
}
