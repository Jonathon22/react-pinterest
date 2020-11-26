import React, { Component } from 'react';
import AppModal from '../Components/AppModal';
import { getPin } from '../Helpers/Data/pinData';
import PinForm from '../Components/Forms/PinForm';

class PinDetails extends Component {
  state = {
    pin: {},
  }

  componentDidMount() {
    const pinId = this.props.match.params.id;
    this.PinUpdate(pinId);
  }

   PinUpdate = (pinId) => {
     getPin(pinId).then((response) => {
       this.setState({
         pin: response,
       });
     });
   }

   render() {
     const { pin } = this.state;

     return (
      <>
      <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
      <PinForm pin={pin} onUpdate={this.PinUpdate}/>
      </AppModal>
      </>

     );
   }
}

export default PinDetails;
