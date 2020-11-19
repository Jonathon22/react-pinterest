import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Boards extends Component {
  render() {
    const { board } = this.props;
    return (
      <div className='Boards mt-3 col-md-3 mb-3'>
        <div className='card'>
          <img src={board.imageUrl} className='card-img-top' alt='...' />
          <div className='card-body'>
           <h5 className='card-title'>{board.name}</h5>
           <hr></hr>
           <h3>Movie Title</h3>
            <p className='card-text'>{board.description}</p>
            <p className='card-text'>
            </p>
            <Link className='btn btn-warning' to={`/Boards/${board.firebaseKey}`}>VIEW PINS</Link>
          </div>
          </div>
        </div>
    );
  }
}

export default Boards;
