import React, { Component } from "react";
import { connect } from "react-redux";
import { SHOW_ALERT } from "../constants/alert";
import { SET_SORT } from "../constants/menu";
import Card from "./card";
import Head from "./head";
import Menu from "./menu";
import Alert from "./alert";
import "../assets/css/update.css";
import "../assets/css/app.css";
let axios = require("axios");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: "",
      alertHead: "",
      cards: []
    };
  }
  ShowAlert = (head, content) => {
    this.setState({ showAlert: true, alertMessage: content, alertHead: head });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.action && nextProps.alert.action === SHOW_ALERT) {
      this.setState({
        showAlert: true,
        alertMessage: nextProps.alert.content,
        alertHead: nextProps.alert.head
      });
    }
    if (nextProps.sort.action && nextProps.sort.action === SET_SORT) {
      this.onInitSort(nextProps.sort.sort);
    }
  }
  onInitSort(sort) {
    axios
      .get(`/getards?sort=${sort}`)
      .then(response => {
        if (response.data.result) {
          this.setState({ cards: response.data.cards });
        }
      })
      .catch(function(error) {});
  }
  componentWillMount() {
    this.onInitSort("ideaDate");
  }
  render() {
    return (
      <div className="app-fon">
        <Alert
          showAlert={this.state.showAlert}
          message={this.state.alertMessage}
          head={this.state.alertHead}
        />
        <Head />
        <Menu />
        <div className="cards">
          {this.state.cards.map((item, index) => {
            return <Card card={item} ShowAlert={this.ShowAlert} />;
          })}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { alert: state.alertState, sort: state.sortState };
};

let mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
