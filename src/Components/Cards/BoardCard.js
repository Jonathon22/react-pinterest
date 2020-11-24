import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardCard extends Component {
  render() {
    const { board, deleteBoard } = this.props;
    return (
      <div className='main-card mt-3 col-md-3 mb-3'>
        <div className='card'>
          <div className='card-body'>
          <img src={board.imageUrl} className='image card-img-top' alt='...' />
           <h5 className='card-text'>{board.name}</h5>
           <hr></hr>
           <h3 className='card-text'>Movie Title</h3>
            <p className='card-text'>{board.description}</p>
            <p className='card-text'>
            </p>
            <Link className='btn btn-warning' to={`/Boards/${board.firebaseKey}`}>VIEW PINS</Link>
            <button className='btn btn-danger m-1' id={board.firebaseKey} onClick={(e) => deleteBoard(e)}>Delete Board</button>
          </div>
          </div>
        </div>
    );
  }
}

export default BoardCard;
