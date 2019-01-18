import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import "../assets/css/alert.css";
const Modal = posed.div({
  enter: {
    top: "0px",
    opacity: 1,
    delay: 300,
    transition: {
      top: { type: "spring" },
      default: { duration: 300 }
    }
  },
  exit: {
    top:"calc(-100% - 130px)",
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
class Alert extends Component {
  state = { isVisible: false, message:"" };
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
   
    if (nextProps.showAlert && !this.state.isVisible)
    {
      this.setState({
        isVisible: nextProps.showAlert,
        message: nextProps.message,
        head: nextProps.head,
      });
      setTimeout(() => {
        this.setState({
          isVisible: !this.state.isVisible
        });
      }, 3000);
    }
   
  }
  render() {
    const { isVisible } = this.state;

    return (
      <PoseGroup>
        {isVisible && [
          <Shade key="shade" className="shade" />,
          <Modal key="modal" className="modal">
          <div className="alert-fon">
          <h3>{this.state.head}</h3>
          <p>{this.state.message}</p>
            
          </div>
         
          </Modal>
        ]}
      </PoseGroup>
    );
  }
}
export default Alert;
