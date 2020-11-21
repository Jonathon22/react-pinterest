import React from 'react';
import { Link } from 'react-router-dom';

class PinsCard extends React.Component {
  render() {
    const { pin } = this.props;
    return (
      <div className='Pins mt-3 col-md-3 mb-3'>
        <div className='card'>
        <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>
            {pin.description}
          </p>
          <Link className='btn btn-primary' to={`/Pins/${pin.firebaseKey}`}>
            Edit Pin
          </Link>
        </div>
      </div>
      </div>
    );
  }
}

export default PinsCard;
