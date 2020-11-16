import React, { Component } from 'react';
import pinData from '../Helpers/Data/PinBoardData';
import boardData from '../Helpers/Data/BoardData';
import PinsCard from '../Components/Cards/PinsCard';

class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;
    boardData.getSingleBoard(boardId).then((response) => {
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
    boardData.getBoardPins(boardId).then((response) => {
      console.warn(boardId);
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(pinData.getSinglePin(item.pinId));
      });
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pinData={pin} />
      ))
    );

    return (
      <div>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
