import React, { Component } from "react";
import Pagination from "react-js-pagination";
import "./panigation.css";
export default class Panigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCount:10,
      // row
    };
  }
  componentDidMount(){
    // this.setState({ activePage: 1,
    //   })
    // this.props.getPageChange(1,this.state.itemsCount);
  }
  handlePageChange(pageNumber) {
    console.log(pageNumber);
    this.setState({ activePage: pageNumber });
    // this.props.getPageChange(pageNumber,this.state.itemsCount);
  }
  handleItemPageChange(e) {
    let { value } = e.target;
    this.setState({itemsCount:parseInt(value),activePage:1});
    
    // this.props.getPageChange(1,parseInt(value));
  }

  render() {
    // console.log(this.props.totalData);
    return (
      <div className="m-auto d-flex">
        <div className="m-auto pr-1">
          <select
            onChange={this.handleItemPageChange.bind(this)}
            className="p-2 border"
          >
            <option>10</option>
            <option>30</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCount}
          totalItemsCount={this.props.totalData}
          pageRangeDisplayed={Math.ceil( this.props.totalData/this.state.itemsCount)}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
