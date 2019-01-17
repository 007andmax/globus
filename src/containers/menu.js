import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../assets/css/menu.css";

function ItemSelect(props) {
  return props.list.map((item, index) => {
    if (!item.select) {
      return (
        <div
          key={index}
          index={index}
          className="select-chouse-item"
          onClick={props.stage.SelectChouse}
        >
          <p>{item.value}</p>
        </div>
      );
    }
  });
}
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: [
        { value: "Новые", label: "Chocolate", select: true },
        { value: "По доходу", label: "Strawberry", select: false },
        { value: "По цене", label: "Vanilla", select: false }
      ],
      index_select: 0
    };
    this.SelectChouse = this.SelectChouse.bind(this);
    this.showChouses = this.showChouses.bind(this);
    this.closedShouse = this.closedShouse.bind(this);
  }
  closedShouse() {
    const node = ReactDOM.findDOMNode(this);
    node.querySelector(".select-chouse").style.display = "none";
    node.querySelector(".select-mask").style.display = "none";
  }
  showChouses() {
    const node = ReactDOM.findDOMNode(this);
    node.querySelector(".select-chouse").style.display = "block";
    node.querySelector(".select-mask").style.display = "block";
  }
  SelectChouse(event) {
    this.closedShouse();
    event.preventDefault();
    this.setState({
      index_select: Number(event.currentTarget.getAttribute("index"))
    });
  }
  render() {
    return (
      <div className="menu">
        <div className="menu-content">
        <div className="select-mask" onClick={this.closedShouse}></div>
          <div className="chouse">
            <p>показывать</p>
            <div className="select" onClick={this.showChouses}>
              <p>{this.state.select[this.state.index_select].value}</p>
            </div>
            <div className="select-chouse">
              <ItemSelect list={this.state.select} stage={this} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
