import React, { Component } from "react";
import "../assets/css/card.css";
import InputMask from 'react-input-mask';



class Card extends Component {
 points = new Array(7);
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: ""
    };
  }
  render() {
    return (
      <div className={"card " + this.props.class}>
        <div className="date">
          <p>10.10.2018</p>
        </div>
        <div className="head">
          <h3 className="etf-head">ETF RUSS</h3>
          <h3 className="square-head">Square</h3>
          <h3 className="firbit-head">fitbit</h3>
          <p>Идея по ETF RUSS</p>
        </div>
        <div className="income">
          <p>Прогнозируемый доход:</p>
          <h6>50,41%</h6>
          <span>за 3 месяца</span>
        </div>
        <div className="prices">
          <div className="prices-item">
            <h6>$ 10,56</h6>
            <p>Цена покупки</p>
          </div>
          <div className="prices-item">
            <h6>$ 10,56</h6>
            <p>Цена покупки</p>
          </div>
          <div className="prices-item">
            <h6>$ 10,56</h6>
            <p>Цена покупки</p>
          </div>
          <div className="prices-item">
            <h6>$ 10,56</h6>
            <p>Цена покупки</p>
          </div>
        </div>
        <div className="progress">
          <div className="progress-head">
            <p>Идея реализована на:</p>
            <h6>0,56 %</h6>
          </div>

          <div className="progress-bar">
            <h6>0%</h6>
            <div className="progress-bar-body">
              <div className="progress-bar-body-line" />
              <div className="progress-bar-body-points">
              {
                Array.apply(null, Array(7)).map((item,index)=> {
                  return (<div key={index} className="progress-bar-item" />);
                })
               
              }
              </div>
            </div>
            <h6>100%</h6>
          </div>
        </div>
        <button>Инвестировать</button>
        <button className="submit-app">Оставить заявку</button>
        <div className="phone"> <InputMask {...this.props} mask="+7\9999999999" maskChar=" " />
</div>
      </div>
    );
  }
}

export default Card;
