import React, { Component } from 'react';
import BoardCard from '../Components/Cards/BoardCard';
import boardData from '../Helpers/Data/BoardData';
import BoardForm from '../Components/Forms/BoardForm';
import AppModal from '../Components/AppModal';
import getUid from '../Helpers/Data/authData';
import Loader from '../Components/Loader';

class Boards extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    boardData.getAllUserBoards(currentUserId).then((resp) => {
      this.setState({
        boards: resp,
      }, this.setLoading);
    });
  }

  deleteBoard = (e) => {
    const removedBoard = this.state.boards.filter(
      (board) => board.firebaseKey !== e.target.id,
    );
    this.setState({
      boards: removedBoard,
    });
    boardData.deleteBoard(e.target.id).then(() => {
      this.getBoards();
    });
  };

  render() {
    const { boards, loading } = this.state;
    const renderBoardsToDom = () => (
      boards.map((board) => <BoardCard key={board.firebaseKey} board={board} deleteBoard={this.deleteBoard} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
            <BoardForm onUpdate={this.getBoards} />
            </AppModal>
          <h1 className='title d-flex flex-wrap justify-content-center m-2'>Boards</h1>
          <div className='d-flex flex-wrap justify-content-center container'>{renderBoardsToDom()}</div>
          </>
        )}
      </>
    );
  }
}

export default Boards;
