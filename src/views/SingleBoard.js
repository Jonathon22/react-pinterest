import React from 'react';
import { getBoardPins, getPin, deletePin } from '../Helpers/Data/pinData';
import boardData from '../Helpers/Data/BoardData';
import PinsCard from '../Components/Cards/PinsCard';
import BoardForm from '../Components/Forms/BoardForm';
import AppModal from '../Components/AppModal/index';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardFirebaseKey = this.props.match.params.id;
    this.getBoardInfo(boardFirebaseKey);
    this.getPins(boardFirebaseKey).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  getBoardInfo = (boardFirebaseKey) => {
    boardData.getSingleBoard(boardFirebaseKey).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardFirebaseKey) => (
    getBoardPins(boardFirebaseKey).then((response) => {
      const pinsArray = [];
      response.forEach((item) => {
        pinsArray.push(getPin(item.pinId));
      });
      return Promise.all([...pinsArray]);
    })
  );

  removePin = (e) => {
    deletePin(e.target.id).then(() => {
      this.getPins()
        .then((resp) => {
          this.setState({
            pins: resp,
          });
        });
    });
  }

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (<PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} isOnHome={true}/>)));
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'} buttonColor={'success'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
