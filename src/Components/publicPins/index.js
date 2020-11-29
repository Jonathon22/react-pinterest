import React, { Component } from 'react';
import { getPinsOnHome } from '../../Helpers/Data/pinData';
import PublicCard from '../Cards/publicPinCard';

class PublicPins extends Component {
  state = {
    publicPins: [],
  };

  componentDidMount() {
    this.getPublicPins();
  }

  getPublicPins = () => {
    getPinsOnHome().then((response) => {
      this.setState({
        publicPins: response,
      });
    });
  }

  render() {
    const { publicPins } = this.state;
    const renderPublicPins = () => (
      publicPins.map((pin) => <PublicCard key={pin.firebaseKey} pin={pin} />)
    );
    return (
      <>
      <h1 className="title d-flex flex-wrap justify-content-center m-2">Check these out</h1>
      <div className="d-flex flex-wrap justify-content-center container">{renderPublicPins()}</div>
      </>
    );
  }
}

export default PublicPins;
