import React, { Component } from 'react';
import PinsCard from '../Components/Cards/PinsCard';
import { getPins } from '../Helpers/Data/pinData';

class Pins extends Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    getPins().then((resp) => {
      console.warn(resp);
      this.setState({
        pins: resp,
      });
    });
  }

  render() {
    const { pins } = this.state;
    const renderPinsToDom = () => (
      pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} />)
    );

    return (
    <>
    <h1 className='d-flex flex-wrap justify-content-center m-2'>Pins</h1>
    <div className="d-flex flex-wrap justify-content-center container">{renderPinsToDom()}</div>
    </>
    );
  }
}

export default Pins;
