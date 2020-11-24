import React, { Component } from 'react';
import Loader from '../Components/Loader';
import PinsCard from '../Components/Cards/PinsCard';
import { getAllUserPins } from '../Helpers/Data/pinData';
import getUid from '../Helpers/Data/authData';
import Auth from '../Components/Auth';

export default class Home extends Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const userid = getUid();
    getAllUserPins(userid)
      .then((pins) => {
        this.setState({
          pins,
          loading: false,
        });
      });
  }

  loadComponent = () => {
    const { user } = this.props;
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = this.state.pins.length
      && this.state.pins.map((pin) => (
        <PinsCard key={pin.firebaseKey} pin={pin} />
      ));
    } else {
      component = <Auth />;
    }
    return component;
  };

  render() {
    return (
      <div>
        <h1 className='home-title mt-5 flex-wrap justify-content-center'><i class="fab fa-pinterest"></i> Welcome To Pinterest</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
        {!this.state.loading && this.loadComponent()}
        </div>
      </div>
    );
  }
}
