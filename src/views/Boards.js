import React, { Component } from 'react';
import Boards from '../Components/Cards/BoardCard';
import { getBoards } from '../Helpers/Data/BoardData';
import BoardForm from '../Components/Forms/BoardForm';

class BoardArea extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    getBoards().then((resp) => {
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
        <BoardForm onUpdate={this.getBoards}/>
      <div className='Boards d-flex flex-wrap'>
      {renderBoardsToDom()}
      </div>
      </>
    );
  }
}

export default BoardArea;
