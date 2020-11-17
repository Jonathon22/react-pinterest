import React, { Component } from 'react';
import { getSinglePin } from '../Helpers/Data/pinData';
import { getSingleBoard, getBoardPins } from '../Helpers/Data/BoardData';
import PinsCard from '../Components/Cards/PinsCard';

class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    this.getPins(boardId)
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(getSinglePin(item.pinId));
      });
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const renderPinsToDom = () => (
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pin={pin}/>
      ))
    );

    return (
      <div>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPinsToDom()}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
