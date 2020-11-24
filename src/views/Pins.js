import React, { Component } from 'react';
import AppModal from '../Components/AppModal';
import PinsCard from '../Components/Cards/PinsCard';
import PinForm from '../Components/Forms/PinForm';
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
    <h1 className='title d-flex flex-wrap justify-content-center m-2'>Pins</h1>
    <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
      <PinForm onUpdate={this.getPins} />
    </AppModal>
    <div className="d-flex flex-wrap justify-content-center container">{renderPinsToDom()}</div>
    </>
    );
  }
}

export default Pins;
