import React, { Component } from "react";
import Card from "./card";
import Head from "./head";
import Menu from "./menu";
import { connect } from "react-redux";
import "../assets/css/update.css";
import "../assets/css/app.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: ""
    };
  }
  componentWillReceiveProps(nextProps) {
   
    // return true;
  }

  render() {
    return (
      <div className="app-fon">
      <Head />
      <Menu />
      <div className="cards">
        <Card class="etf-card" />
        <Card class="square-card" />
        <Card class="firbit-card" />
      </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { event: state.eventState };
};

let mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
