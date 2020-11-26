import React, { Component } from 'react';
import AppModal from '../Components/AppModal';
import PinsCard from '../Components/Cards/PinsCard';
import PinForm from '../Components/Forms/PinForm';
import getUid from '../Helpers/Data/authData';
import { getAllUserPins, deletePin } from '../Helpers/Data/pinData';

class Pins extends Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const currentUserId = getUid();
    getAllUserPins(currentUserId).then((resp) => {
      console.warn(resp);
      this.setState({
        pins: resp,
      });
    });
  }

  removePin = (e) => {
    const removedPin = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: removedPin,
    });
    deletePin(e.target.id).then(() => {
      this.getPins();
    });
  }

  render() {
    const { pins } = this.state;
    const renderPinsToDom = () => (
      pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />)
    );

    return (
    <>
    <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
      <PinForm onUpdate={this.getPins} pin={this.state.pin} />
    </AppModal>
    <h1 className='title d-flex flex-wrap justify-content-center m-2'>Pins</h1>
    <div className="d-flex flex-wrap justify-content-center container">{renderPinsToDom()}</div>
    </>
    );
  }
}

export default Pins;
