import React, { Component } from "react";
import InputMask from "react-input-mask";
import ReactDOM from "react-dom";
import "../assets/css/card.css";
let axios = require("axios");
function GetDate(props) {
  let date = new Date(props.date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  return `${day >= 10 ? day : "0" + day}.${
    month >= 10 ? month : "0" + month
  }.${date.getFullYear()}`;
}

class Card extends Component {
  points = new Array(7);
  constructor(props) {
    super(props);
    this.state = {
      phone: null
    };
    this.Investing = this.Investing.bind(this);
    this.submitApp = this.submitApp.bind(this);
  }
  onChangePhone = event => {
    this.setState({
      phone: event.target.value
    });
  };
  Investing() {
    if (!this.props.card.status) return;
    const node = ReactDOM.findDOMNode(this);
    node.querySelector(".invest").style.display = "none";
    node.querySelector(".add-app").style.display = "flex";
  }
  submitApp() {
    if (
      this.state.phone === null ||
      (this.state.phone !== null &&
        this.state.phone.replace(/\s/g, "").length !== 12)
    )
      return;

    axios
      .post("/addphone", { _id: this.props.card._id, phone: this.state.phone })
      .then(response => {
        if (response.data.result) {
          const node = ReactDOM.findDOMNode(this);
          this.props.ShowAlert(
            "Ваш телефон был добавлен",
            `Вы отправили номер - ${this.state.phone}`
          );
          node.querySelector(".phone input").value = "";

          node.querySelector(".invest").style.display = "block";
          node.querySelector(".add-app").style.display = "none";
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentWillMount() {}
  render() {
    let progress =
      ((((this.props.card.price - this.props.card.buyPrice) * 100) /
        this.props.card.buyPrice) *
        100) /
      (((this.props.card.sellPrice - this.props.card.buyPrice) * 100) /
        this.props.card.buyPrice);
    let current_income =
      ((this.props.card.price - this.props.card.buyPrice) * 100) /
      this.props.card.buyPrice;
    return (
      <div className="card">
        <div className="date">
          <p>
            <GetDate date={this.props.card.ideaDate} />
          </p>
        </div>
        <div className="head">
          <img
            src={window.location.href + "download?pathfile=" +
              this.props.card.logoSrc
            }
          />
          <p>{this.props.card.name}</p>
        </div>
        <div className="income">
          <p>Прогнозируемый доход:</p>
          <h6>
            {(
              ((this.props.card.sellPrice - this.props.card.buyPrice) * 100) /
              this.props.card.buyPrice
            ).toFixed(2)}
            %
          </h6>
          <span>за {this.props.card.period}</span>
        </div>
        <div className="prices">
          <div className="prices-item">
            <h6>$ {this.props.card.buyPrice}</h6>
            <p>Цена покупки</p>
          </div>
          <div className="prices-item">
            <h6>$ {this.props.card.sellPrice}</h6>
            <p>Цена продажи</p>
          </div>
          <div className="prices-item">
            <h6>$ {this.props.card.price}</h6>
            <p>текущая цена</p>
          </div>
          <div className="prices-item">
            <h6 className={current_income > 0 ? "mplus-incoe" : "minus-income"}>
              {current_income > 0 ? "+" : ""} {current_income.toFixed(2)}%
            </h6>
            <p>текущий доход</p>
          </div>
        </div>
        <div className="progress">
          <div className="progress-head">
            <p>Идея реализована на:</p>
            <h6>{progress.toFixed(2)} %</h6>
          </div>

          <div className="progress-bar">
            <h6>0%</h6>
            <div className="progress-bar-body">
              <div
                className="progress-bar-body-line"
                style={{
                  width: (progress > 100 ? 100 : progress) * 4 - 6 + "px"
                }}
              />
              <div className="progress-bar-body-points">
                {Array.apply(null, Array(7)).map((item, index) => {
                  return <div key={index} className="progress-bar-item" />;
                })}
              </div>
            </div>
            <h6>100%</h6>
          </div>
        </div>
        <button
          className={
            this.props.card.status === false
              ? "disable-invest invest"
              : "invest"
          }
          onClick={this.Investing}
        >
          Инвестировать
        </button>
        <div className="add-app">
          <div className="phone">
            {" "}
            <InputMask
              {...this.props}
              mask="+7\9999999999"
              onChange={this.onChangePhone}
              placeholder="Введите номер"
              maskChar=" "
            />
          </div>
          <button className="invest" onClick={this.submitApp}>
            Оставить заявку
          </button>
        </div>
      </div>
    );
  }
}
export default Card;
