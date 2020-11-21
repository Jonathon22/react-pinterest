import React, { Component } from 'react';
import BoardCard from '../Components/Cards/BoardCard';
import { getAllUserBoards } from '../Helpers/Data/BoardData';
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
    getAllUserBoards(currentUserId).then((resp) => {
      this.setState({
        boards: resp,
      }, this.setLoading);
    });
  }

  render() {
    const { boards, loading } = this.state;
    const renderBoardsToDom = () => (
      boards.map((board) => <BoardCard key={board.firebaseKey} board={board} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal className='d-flex flex-wrap justify-content-center m-2' title={'Create Board'} buttonLabel={'Create Board'}>
            <BoardForm onUpdate={this.getBoards} />
            </AppModal>
          <h1 className='d-flex flex-wrap justify-content-center m-2'>Boards</h1>
          <div className='d-flex flex-wrap justify-content-center container'>{renderBoardsToDom()}</div>
          </>
        )}
      </>
    );
  }
}

export default Boards;
