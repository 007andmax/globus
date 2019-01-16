import React, { Component } from "react";
import "../assets/css/menu.css";
class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-content">
          <div class="chouse">
          <p>показывать</p>
            <select>
              <option>Новые</option>
              <option>По доходу</option>
              <option>По цене</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
