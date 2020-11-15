import React, { Component } from 'react';
import boardData from '../../Helpers/Data/BoardData';
import Boards from '../BoardCard';

class BoardArea extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardData.getBoards().then((resp) => {
      this.setState({
        boards: resp,
      });
    });
  }

  render() {
    const { boards } = this.state;
    const renderBoardsToDom = () => (
      boards.map((board) => <Boards key={board.firebaseKey} board={board} />)
    );
    return (
      <>
      <div className='Boards d-flex flex-wrap'>
      {renderBoardsToDom()}
      </div>
      </>
    );
  }
}

export default BoardArea;
