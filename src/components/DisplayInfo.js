import React, { Component } from 'react';
import './displayinfo.css'

class DisplayInfo extends Component {

  render() {
    return (
      <div className='displayinfo'>
        <h4>Information about transaction:</h4>
        <p>Transaction: {this.props.country} {this.props.date}</p>
        <p>Conflict with holiday: {this.props.conflict}</p>
        <p>Name of holiday: {this.props.holiday}</p>
        <p>Public holiday: {this.props.public}</p>
        <p>Conversion Rate: {this.props.rate}</p>
        <p>Amount: {this.props.calc}</p>
      </div>
    );
  }
}
 
export default DisplayInfo;